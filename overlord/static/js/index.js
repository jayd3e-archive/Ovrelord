var overlord = {
    module: function() {
        var modules = {};

        return function(name) {
            if (modules[name]) {
                return modules[name];
            }

            return modules[name] = { Views: {} };
        };
    }(),

    app: _.extend({}, Backbone.Events)
};


$(function() {
    var app = overlord.app;

    /*
    *
    * Dependencies
    *
    */

    Cache = overlord.module("cache");
    Overview = overlord.module("overview");
    Queue = overlord.module("queue");

    var Router = Backbone.Router.extend({

        routes : {
            "cache": "cache",
            "overview": "overview",
            "queues/:queue": "queue"
        },

        cache: function() {
            $("#page").empty();
            new Cache.Views.MainView();
        },

        overview: function() {
            $("#page").empty();
            new Overview.Views.MainView();
        },

        queue: function(queue) {
            $("#page").empty();
            attrs = {id: queue};
            queue = new Queue.Model(attrs);
            new Queue.Views.MainView({queue: queue});
        }

    });

    app.router = new Router();
    Backbone.history.start();
});