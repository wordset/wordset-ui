import Ember from "ember";
import EmberValidations from 'ember-validations';

export default Ember.ObjectController.extend(EmberValidations.Mixin, {
  validations: {
    def: {
      presence: true,
      length: { minimum: 10 }
    },
    example: {
      presence: true,
      length: { minimum: 10 }
    },
    reason: {
      presence: true,
      length: { minimum: 10 }
    }
  },
  posList: ["adv", "adj", "verb", "noun"],

  actions: {
  }
});
