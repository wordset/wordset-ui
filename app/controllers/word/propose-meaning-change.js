import Ember from 'ember';
import EmberValidations from 'ember-validations';

export default Ember.ObjectController.extend(EmberValidations.Mixin, {
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
      var _this = this;
      var proposal = this.get("model");
      proposal.set("type", "MeaningChange");

      proposal.save().then(function() {
        _this.get("parentController").set("editing", false);
        _this.set("meaning.hasProposal", true);
        _this.set("meaning.openProposal", _this.get("model"));
        _this.send("log", "proposal", "meaning change");
      },
      function(errors) {
        _this.set("errors", errors.errors);
      });
    },
  }
});
