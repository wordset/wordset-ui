import Ember from 'ember';
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
    }
  },
  actions: {
    submitProposal: function() {
      var _this = this;
      var proposal = this.get("model");
      proposal.set("type", "MeaningChange");

      proposal.save().then(function(proposal) {
        _this.get("parentController").set("editing", false);
      },
      function(errors) {
        _this.set("errors", errors.errors);
      });
    },
  }
});
