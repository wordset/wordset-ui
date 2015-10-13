import Ember from "ember";
import ENV from "../../config/environment";
import EmberValidations from "ember-validations";

export default Ember.Controller.extend(EmberValidations, {
  notifier: Ember.inject.service(),
  validations: {
    "model.def": {
      generic: true,
      definitionlike: true,
    },
    "model.example": {
      generic: true,
      nongendered: true,
      sentencelike: true,
    }
  },
  application: Ember.inject.controller('project'),

  htmlRules: Ember.computed("project.rules", function() {
    return Ember.String.htmlSafe(this.get("project.rules"));
  }),

  actions: {
    submitProposal() {
      var _this = this;
      this.get("proposal").save().then(
        function() {
          _this.get("notifier").show("Thanks! Here's another word that needs cleaning up.", {name: "Alert"});
          _this.send("randomTarget");
        }, function() {
          _this.send("randomTarget");
        }
      );
    },
    randomTarget: function() {
      var _this = this;
      var path = "/projects/" + this.get("project.id") + "/next";
      Ember.$.getJSON(ENV.api + path).then(
        function(data) {
          _this.store.pushPayload('wordset', data);
          _this.store.findRecord('wordset', data.wordset.id).then(function(wordset) {
            _this.set("proposal", _this.store.createRecord('proposal', {
              wordset: wordset,
              changes: wordset.generateInitialChangeSet(),
              lang: wordset.get('lang'),
            }))
          }, function() { })
        }, function() { }
      );

    }
  }
});
