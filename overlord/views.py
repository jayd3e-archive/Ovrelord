import redis
import json
from retools.cache import CacheKey
from pyramid.view import view_config


@view_config(route_name="index", renderer="overlord:templates/index.mako")
def index(request):
    return {}


@view_config(route_name="regions", renderer="json")
def regions(request):
    r = redis.Redis()
    regions = r.smembers("retools:regions")

    regions_json = []
    for region in regions:
        region_json = {"namespaces": [], "name": ""}
        namespaces = r.smembers("retools:" + region + ":namespaces")

        for namespace in namespaces:
            namespace_json = {"keys": [], "name": namespace}
            keys = r.smembers("retools:" + region + ":" + namespace + ":keys")

            for key in keys:
                retools_vals = r.hgetall("retools:%s:%s:%s" % (region, namespace, key))
                keys = CacheKey(region, namespace, key)

                key_json = {"name": key,
                            "value": retools_vals['value'],
                            "created": retools_vals['created'],
                            "hits": r.get(keys.redis_hit_key),
                            "misses": r.get(keys.redis_miss_key)}

                namespace_json["keys"].append(key_json)

            region_json["namespaces"].append(namespace_json)

        region_json["name"] = region
        regions_json.append(region_json)

    return regions_json


@view_config(route_name="queues", renderer="json")
def queues(request):
    r = redis.Redis()
    queues = r.smembers("retools:queues")

    for queue in queues:
        queues_json = [json.loads(q) for q in r.lrange("retools:queue:" + queue, 0, -1)]

    return queues_json


@view_config(route_name="workers", renderer="json")
def workers(request):
    r = redis.Redis()
    workers = r.smembers("retools:workers")

    for worker in workers:
        worker_str = r.get("retools:worker:" + worker)
        worker_json = json.loads(worker_str)

    return worker_json
