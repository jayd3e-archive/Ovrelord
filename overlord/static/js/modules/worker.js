(function(Worker) {

    var worker_list_source = $("#worker_list").html();
    var worker_list_template = Handlebars.compile(worker_list_source);
    var condensed_worker_source = $("#condensed_worker").html();
    var condensed_worker_template = Handlebars.compile(condensed_worker_source);

    Worker.Model = Backbone.Model.extend({
        urlRoot: "workers"
    });

    WorkerList = Backbone.Collection.extend({
        url: "workers",
        model: Worker.Model
    });

    var workers = new WorkerList();

    Worker.Views.WorkerList = Backbone.View.extend({
        className: "workers",

        initialize: function() {
            that = this;
            that.id = "1";
            workers.fetch({success: function() {
                workers.each(function(worker) {
                    var model = new Worker.Model(worker.toJSON());
                    var worker_view = new Worker.Views.CondensedWorker({model: model});
                    that.$(".worker_table tbody").append(worker_view.el);
                });
            }});
        },

        render: function() {
            worker_list =  worker_list_template();
            this.$el.html(worker_list);
            return this;
        }
    });

    Worker.Views.CondensedWorker = Backbone.View.extend({
        tagName: "tr",
        className: "worker",

        initialize: function(){
            this.render();
        },

        render: function() {
            var template = condensed_worker_template(this.model.toJSON());
            this.$el.html(template);
        }
    });

})(overlord.module("worker"));