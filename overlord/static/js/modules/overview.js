(function(Overview) {

    Queue = overlord.module("queue");
    Worker = overlord.module("worker");

    Overview.Views.MainView = Backbone.View.extend({
        el: $("#page"),

        initialize: function() {
            this.$el.empty();
            queue_list = new Queue.Views.QueueListView();
            this.$el.append(queue_list.render().el);

            worker_list = new Worker.Views.WorkerList();
            this.$el.append(worker_list.render().el);
        }

    });

})(overlord.module("overview"));