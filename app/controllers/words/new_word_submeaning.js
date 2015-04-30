import Ember from "ember";
import EmberValidations from 'ember-validations';

export default Ember.Controller.extend(EmberValidations.Mixin, {
  validations: {
    "model.def": {
      presence: true,
      length: { minimum: 10 }
    },
    "model.example": {
      presence: true,
      length: { minimum: 10 }
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
