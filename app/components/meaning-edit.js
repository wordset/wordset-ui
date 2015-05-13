import Ember from 'ember';
import EmberValidations from 'ember-validations';

export default Ember.Component.extend( EmberValidations.Mixin, {
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
  },
  showButtons: true,
  actions: {
    submitEdit: function() {
      this.get("targetObject").send("submitEdit");
    },
    cancelEdit: function() {
      this.get("targetObject").send("cancelEdit");
    }
  }
});
