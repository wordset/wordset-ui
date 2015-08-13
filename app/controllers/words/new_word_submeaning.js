import Ember from "ember";
import EmberValidations from 'ember-validations';

export default Ember.Controller.extend(EmberValidations, {
  validations: {
    "model.def": {
      generic: true,
      definitionlike: true,
    },
    "model.example": {
      generic: true,
      nongendered: true,
      sentencelike: true,
    },
    "model.reason": {
      presence: true,
      length: { minimum: 10 }
    }
  },
  lang: function() {
    return this.parentController.get("model.lang");
  }.property("lang"),

  actions: {
  }
});
