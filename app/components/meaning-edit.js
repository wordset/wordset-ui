import Ember from 'ember';
import EmberValidations from 'ember-validations';

export default Ember.Component.extend( EmberValidations.Mixin, {
  validations: {
    "model.def": {
      presence: true,
      length: { minimum: 10 }
    },
    "model.example": {
      presence: true,
      length: { minimum: 10 }
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
