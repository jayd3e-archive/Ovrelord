from pyramid.config import Configurator
from pyramid.httpexceptions import HTTPNotFound
from pyramid.httpexceptions import HTTPForbidden
from overlord.exceptions import not_found
from overlord.exceptions import forbidden
from overlord.resources import Site


def main(global_config, **settings):
    '''Main config function'''
    config = Configurator(settings=settings,
                          root_factory=Site)

    # Includes
    config.include('pyramid_debugtoolbar')

    config.add_static_view(name='static', path='overlord:static')

    #View Root Routes
    config.add_route('index', '/')

    #View Action Routes

    #Exception Views
    config.add_view(not_found,
                    context=HTTPNotFound,
                    permission='__no_permission_required__',
                    renderer='overlord:templates/exceptions/not_found.mako')
    config.add_view(forbidden,
                    context=HTTPForbidden,
                    permission='__no_permission_required__')

    config.scan('overlord')
    return config.make_wsgi_app()