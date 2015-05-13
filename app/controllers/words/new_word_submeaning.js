import Ember from "ember";
import EmberValidations from 'ember-validations';

export default Ember.Controller.extend(EmberValidations.Mixin, {
  validations: {
    "model.def": {
      generic: true,
    },
    "model.example": {
      generic: true,
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
