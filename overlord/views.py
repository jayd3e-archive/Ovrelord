import redis
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
        region_json = {}
        namespaces = r.smembers("retools:" + region + ":namespaces")

        for namespace in namespaces:
            region_json[namespace] = {}
            keys = r.smembers("retools:" + region + ":" + namespace + ":keys")

            for key in keys:
                retools_vals = r.hgetall("retools:%s:%s:%s" % (region, namespace, key))
                keys = CacheKey(region, namespace, key)
                region_json[namespace][key] = {"value": retools_vals['value'],
                                                        "created": retools_vals['created'],
                                                        "hits": r.get(keys.redis_hit_key),
                                                        "misses": r.get(keys.redis_miss_key)}

        region_json["name"] = region
        regions_json.append(region_json)

    return regions_json
