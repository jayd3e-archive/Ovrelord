(function(Queue) {

    var queue_source = $("#queue").html();
    var queue_template = Handlebars.compile(queue_source);

    Queue.Model = Backbone.Model.extend({

    });

    QueueList = Backbone.Collection.extend({
        url: "queues",
        model: Queue.Model
    });

    var queues = new QueueList();

    Queue.Views.QueueListView = Backbone.View.extend({
        initialize: function() {
            that = this;
            queues.fetch({success: function() {
                queues.each(function(queue) {
                    var model = new Queue.Model(queue.toJSON());
                    var queue_view = new Queue.Views.QueueView({model: model});
                    that.$el.append(queue_view.el);
                });
            }});
        }
    });

    Queue.Views.QueueView = Backbone.View.extend({
        tagName: "div",
        className: "queue",

        initialize: function() {
            this.render();
        },

        render: function() {
            var template = queue_template(this.model.toJSON());
            this.$el.html(template);
        }
    });

    Queue.Views.MainView = Backbone.View.extend({
        el: $("#page"),

        initialize: function() {
            this.$el.empty();
            queue_list = new Queue.Views.QueueListView();
            this.$el.append(queue_list.el);
        }

    });

})(overlord.module("queue"));