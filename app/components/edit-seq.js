import Ember from 'ember';
import EmberValidations from 'ember-validations';

export default Ember.Component.extend( EmberValidations, {
  validations: {
    "seq.text": {
      presence: true,
    },
  },
});
