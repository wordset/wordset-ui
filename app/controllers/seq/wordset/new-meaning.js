import Ember from 'ember';
import EmberValidations from 'ember-validations';

export default Ember.Controller.extend( EmberValidations,
{
  validations: {
    "model.def": {
      generic: true,
      definitionlike: true,
    },
    "model.example": {
      generic: true,
      nongendered: true,
      sentencelike: true,
    }
  },

  actions: {
    submitProposal: function() {
      this.send("log", "proposal", "new meaning");
      this.get("proposalTarget");

      var _this = this;
      this.get("model").save().then(
        function(model) {
          _this.transitionToRoute("proposal", model);
        },
        function() {
          // apparently, just defining this function
          // makes everything work. weird.
        }
      );
    },
  }
});
