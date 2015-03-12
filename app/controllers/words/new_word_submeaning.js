import Ember from "ember";
import EmberValidations from 'ember-validations';
import ENV from '../../config/environment';

export default Ember.ObjectController.extend(EmberValidations.Mixin, {
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
  posList: ENV.posList,

  actions: {
  }
});
