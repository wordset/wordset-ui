import Ember from 'ember';
import EmberValidations from 'ember-validations';

export default Ember.Controller.extend( EmberValidations.Mixin,
{
  validations: {
    "model.def": {
      presence: true,
      length: { minimum: 10 }
    },
    "model.example": {
      presence: true,
      length: { minimum: 10 }
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
          _this.parentController.set("newMeaningProposal", null);
        },
        function() {
          // apparently, just defining this function
          // makes everything work. weird.
        }
      );
    },
  }
});
