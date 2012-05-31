(function(Region) {

    var reply_source = $("#region").html();
    var reply_template = Handlebars.compile(reply_source);

    Region.Model = Backbone.Model.extend({

    });

    RegionList = Backbone.Collection.extend({
        url: "regions",
        model: Region.Model
    });

    var regions = new RegionList();

    Region.Views.RegionListView = Backbone.View.extend({
        id: "regions",
        tagName: "div",

        initialize: function() {
            that = this;
            regions.fetch({success: function() {
                $.each(regions.toJSON(), function(index, region) {
                    var model = new Region.Model(region);
                    var region_view = new Region.Views.RegionView({model: model});
                    that.$el.append(region_view.el);
                });
            }});
        }

    });

    Region.Views.RegionView = Backbone.View.extend({
        tagName: "div",
        className: "region",

        initialize: function() {
            this.render();
        },

        render: function() {
            var template = reply_template(this.model.toJSON());
            this.$el.html(template);
        }
    });

})(overlord.module("region"));