// This is really the creation of
// a new meaning proposal

import Ember from "ember";
import EmberValidations from 'ember-validations';

export default Ember.ObjectController.extend(EmberValidations.Mixin, {
  validations: {
    wordName: {
      presence: true,
      length: { minimum: 1 }
    },
  },
  posList: ["adv", "adj", "verb", "noun"],

  canRemove: function() {
    return this.get("model").get("meanings").length > 1
  }.property("model.meanings.@each"),

  actions: {
    submitProposal: function() {
      var _this = this;
      this.send("log", "propose new word");
      this.get("model").save().then(
        function(p) {
          _this.transitionToRoute("proposal.index", p);
        },
        function() {}
        );
    },
    addMeaning: function() {
      this.get("model").get("meanings").addObject({});
    },
    removeMeaning: function(meaning) {
      this.get("model").get("meanings").removeObject(meaning);
    }
  }


});
