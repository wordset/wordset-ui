import Ember from 'ember';
import EmberValidations from 'ember-validations';

export default Ember.Controller.extend( EmberValidations.Mixin, {

  validations: {
    def: {
      presence: true,
      length: { minimum: 10 }
    },
    example: {
      presence: true,
      length: { minimum: 10 }
    },
  },
});
