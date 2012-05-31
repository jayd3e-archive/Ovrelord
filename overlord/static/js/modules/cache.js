(function(Cache) {

    Region = overlord.module("region");

    Cache.Views.MainView = Backbone.View.extend({
        el: $("#page"),

        initialize: function() {
            this.$el.empty();
            region_list = new Region.Views.RegionListView();
            this.$el.append(region_list.el);
        }

    });

})(overlord.module("cache"));