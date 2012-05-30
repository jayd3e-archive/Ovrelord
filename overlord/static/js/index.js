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
    app = overlord.app;

    /*
    *
    * Dependencies
    *
    */

    router = Backbone.Router({
        routes : {
            "#cache": "cache"
        },
        cache: function() {
            $("#page").empty();
            new MainView();
        }
    });
});