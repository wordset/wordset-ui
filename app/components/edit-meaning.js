import Ember from 'ember';
import EmberValidations from 'ember-validations';

export default Ember.Component.extend( EmberValidations, {
  validations: {
    "meaning.def": {
      generic: true,
      definitionlike: true,
    },
    "meaning.example": {
      generic: true,
      nongendered: true,
      sentencelike: true,
    },
  },
});
