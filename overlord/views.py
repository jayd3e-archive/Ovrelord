from pyramid import view_config


@view_config(route_name="index")
def index(request):
    return {}
