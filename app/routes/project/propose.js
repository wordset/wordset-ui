import Ember from "ember";
import ENV from "../../config/environment"

export default Ember.Route.extend({
  loadNextTarget: function() {
    var _this = this;
    var path = "/projects/" + this.controller.get("project.id") + "/next";
    Ember.$.getJSON(ENV.api + path).then(
      function(data) {
        _this.store.pushPayload('wordset', data);
        _this.store.findRecord('wordset', data.wordset.id).then(function(wordset) {
          _this.controller.set("proposal", _this.store.createRecord('proposal', {
            wordset: wordset,
            changes: wordset.generateInitialChangeSet(),
            lang: wordset.get('lang'),
          }))
        }, function() { })
      }, function() { }
    );
  },

  setupController(controller, model) {
    this._super(controller, model);
    var project = this.modelFor("project")
    controller.set("project", project)
    this.loadNextTarget()
  },
  actions: {
    refresh: function() {
      this.transitionTo("project.random");
    }
  }



});
