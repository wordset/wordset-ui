import Ember from "ember";
import EmberValidations from "ember-validations";

export default Ember.Controller.extend(EmberValidations.Mixin, {
  notifier: Ember.inject.service(),
  validations: {
    "model.def": {
      generic: true,
    },
    "model.example": {
      generic: true,
    }
  },
  needs: ['project'],
  actions: {
    submitProposal: function() {
      var _this = this;
      this.get("model").save().then(
        function() {
          _this.get("notifier").show("Thanks! Here's another meaning that needs cleaning up.", {name: "Alert"});
          _this.send("randomTarget");
        }, function() {
          _this.send("randomTarget");
        }
      );
    },
    proposeMeaningRemoval: function() {
      var _this = this;

      var proposal = this.store.createRecord("proposal", {
                            type: "MeaningRemoval",
                            meaning: this.get("meaning")
                        });
      this.get("model").destroy();
      proposal.save().then(
        function() {
          _this.get("notifier").show("Thanks! Here's another meaning that needs cleaning up.", {name: "Alert"});
          _this.send("randomTarget");
        }, function() {
          _this.get("notifier").error("Something went wrong that time...");
          _this.send("randomTarget");
        }
      );
    }
  }
});
