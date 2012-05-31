(function(Overview) {

    Queue = overlord.module("queue");

    Overview.Views.MainView = Backbone.View.extend({
        el: $("#page"),

        initialize: function() {
            this.$el.empty();
            queue_list = new Queue.Views.QueueListView();
            this.$el.append(queue_list.el);
        }

    });

})(overlord.module("overview"));