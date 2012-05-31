<%namespace name="header" file="header.mako"/>
<!-- base.mako -->
<!DOCTYPE html>
<html>
    <head>
        <title>Overlord</title>
        <link rel="stylesheet" type="text/css" href="/static/css/bootstrap.css">
    </head>
    <body>
        <header id="header">
            ${ header.header() }
        </header>
        <article id="page" class="container">
            ${ self.body() }
        </article>

        <script id="region" type="handlebars-template">
            <h1>{{ name }}</h1>
        </script>

        <script language="javascript" type="text/javascript" src="/static/js/lib/jquery-1.7.1.js"></script>
        <script language="javascript" type="text/javascript" src="/static/js/lib/handlebars.js"></script>
        <script language="javascript" type="text/javascript" src="/static/js/lib/underscore.js"></script>
        <script language="javascript" type="text/javascript" src="/static/js/lib/backbone.js"></script>

        <!-- APP -->
        <script language="javascript" type="text/javascript" src="/static/js/index.js"></script>
        <script language="javascript" type="text/javascript" src="/static/js/modules/region.js"></script>
        <script language="javascript" type="text/javascript" src="/static/js/modules/cache.js"></script>
    </body>
</html>