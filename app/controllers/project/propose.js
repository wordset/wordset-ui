import Ember from "ember";
import EmberValidations from "ember-validations";

export default Ember.Controller.extend(EmberValidations.Mixin, {
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
  needs: ['project'],
  actions: {
    submitProposal: function() {
      var _this = this;
      this.get("model").save().then(
        function() {
          _this.flash.notice("Thanks! Here's another meaning that needs cleaning up.");
          _this.send("randomTarget");
        }, function() {
          _this.send("randomTarget");
        }
      );
    }
  }
});
