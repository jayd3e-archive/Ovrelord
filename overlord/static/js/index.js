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

    var Router = Backbone.Router.extend({

        routes : {
            "cache": "cache",
            "overview": "overview"
        },

        cache: function() {
            $("#page").empty();
            new Cache.Views.MainView();
        },

        overview: function() {
            $("#page").empty();
            new Overview.Views.MainView();
        }

    });

    app.router = new Router();
    Backbone.history.start();
});