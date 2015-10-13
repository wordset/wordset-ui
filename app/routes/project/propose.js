import Ember from "ember";
import ENV from "../../config/environment"

export default Ember.Route.extend({
  setupController(controller, model) {
    this._super(controller, model);
    var _this = this;
    var project = this.modelFor("project")
    controller.set("project", project)
    var path = "/projects/" + project.get("id") + "/next";
    Ember.$.getJSON(ENV.api + path).then(
      function(data) {
        _this.store.pushPayload('wordset', data);
        _this.store.findRecord('wordset', data.wordset.id).then(function(wordset) {
          controller.set("proposal", _this.store.createRecord('proposal', {
            wordset: wordset,
            changes: wordset.generateInitialChangeSet(),
            lang: wordset.get('lang'),
          }))
        }, function() { })
      }, function() { }
    );
  },
  model() {

  },

});
