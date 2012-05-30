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

    var Router = Backbone.Router.extend({

        routes : {
            "cache": "cache"
        },

        cache: function() {
            $("#page").empty();
            new Cache.Views.MainView();
        }

    });

    app.router = new Router();
    Backbone.history.start();
});