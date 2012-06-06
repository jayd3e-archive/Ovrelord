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
            <h2>{{ name }}</h2>
            {{#each namespaces}}
                <h2>{{ name }}</h2>
                <table>
                {{#each keys}}
                    <tr>
                        <td>{{ name }}</td>
                        <td>{{ misses }}</td>
                        <td>{{ hits }}</td>
                        <td>{{ value }}</td>
                        <td>{{ created }}</td>
                    </tr>
                {{/each}}
                </table>
            {{/each}}
        </script>

        <script id="queue_list" type="handlebars-template">
            <h2>Queues</h2>
            <div class="info">The list below contains all the registered queues with the number of jobs currently in the queue.
                Select a queue from above to view all jobs currently pending on the queue.</div>
            <table class="queue_table">
                <tr>
                    <th>name</th>
                    <tH>jobs</th>
                </tr>
            </table>
        </script>

        <script id="condensed_queue" type="handlebars-template">
            <td><a href="#queues/{{ id }}">{{ id }}</a></td>
            <td></td>
        </script>

        <script id="queue" type="handlebars-template">
            <h2>Pending jobs on {{ id }}</h2>
            <div class="info">Showing 0 of 0 jobs</div>
            <table>
            <tr>
                <th>class</th>
                <th>args</th>
                <th>job id</th>
            </tr>
            {{#each jobs}}
                <tr>
                    <td>{{ job }}</td>
                    <td>
                    {{#each kwargs}}
                        {{ key }}: {{ value }}
                    {{/each}}
                    </td>
                    <td>{{ job_id }}</td>
                </tr>
            {{/each}}
            </table>
        </script>

        <script id="worker_list" type="handlebars-template">
            <h2>0 of 2 Workers Working</h2>
            <div class="info">The list below contains all workers which are currently running a job.</div>
            <table class="worker_table">
                <tr>
                    <th>queue</th>
                    <th>job_id</th>
                    <th>run at</th>
                </tr>
            </table>
        </script>

        <script id="condensed_worker" type="handlebars-template">
            <td>{{ queue }}</td>
            <td>{{ payload.job_id }}</td>
            <td>{{ run_at }}</td>
        </script>

        <script language="javascript" type="text/javascript" src="/static/js/lib/jquery-1.7.1.js"></script>
        <script language="javascript" type="text/javascript" src="/static/js/lib/handlebars.js"></script>
        <script language="javascript" type="text/javascript" src="/static/js/lib/underscore.js"></script>
        <script language="javascript" type="text/javascript" src="/static/js/lib/backbone.js"></script>

        <!-- APP -->
        <script language="javascript" type="text/javascript" src="/static/js/index.js"></script>
        <script language="javascript" type="text/javascript" src="/static/js/modules/worker.js"></script>
        <script language="javascript" type="text/javascript" src="/static/js/modules/queue.js"></script>
        <script language="javascript" type="text/javascript" src="/static/js/modules/overview.js"></script>
        <script language="javascript" type="text/javascript" src="/static/js/modules/region.js"></script>
        <script language="javascript" type="text/javascript" src="/static/js/modules/cache.js"></script>
    </body>
</html>