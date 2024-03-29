(function(Queue) {

    var queue_list_source = $("#queue_list").html();
    var queue_list_template = Handlebars.compile(queue_list_source);
    var condensed_queue_source = $("#condensed_queue").html();
    var condensed_queue_template = Handlebars.compile(condensed_queue_source);
    var queue_source = $("#queue").html();
    var queue_template = Handlebars.compile(queue_source);

    Queue.Model = Backbone.Model.extend({
        urlRoot: "queues"
    });

    QueueList = Backbone.Collection.extend({
        url: "queues",
        model: Queue.Model
    });

    var queues = new QueueList();

    Queue.Views.QueueListView = Backbone.View.extend({
        className: "queues",

        initialize: function() {
            queues.fetch({success: _.bind(function() {
                queues.each(function(queue) {
                    var model = new Queue.Model(queue.toJSON());
                    var queue_view = new Queue.Views.CondensedQueueView({model: model});
                    this.$(".queue_table tbody").append(queue_view.el);
                });
            }, this)});
        },

        render: function() {
            queue_list =  queue_list_template();
            this.$el.html(queue_list);
            return this;
        }
    });

    Queue.Views.CondensedQueueView = Backbone.View.extend({
        tagName: "tr",
        className: "queue",

        initialize: function() {
            this.render();
        },

        render: function() {
            var template = condensed_queue_template(this.model.toJSON());
            this.$el.html(template);
        }
    });

    Queue.Views.QueueView = Backbone.View.extend({
        tagName: "div",
        className: "queue",

        initialize: function() {
            that = this;
            this.model.fetch({success: function() {
                that.render();
            }});
        },

        render: function() {
            var template = queue_template(this.model.toJSON());
            this.$el.html(template);
            return this;
        }

    });

    Queue.Views.MainView = Backbone.View.extend({
        el: $("#page"),

        initialize: function() {
            this.render();
        },

        render: function() {
            queue = new Queue.Views.QueueView({model: this.options.queue});
            this.$el.append(queue.el);
        }

    });

})(overlord.module("queue"));