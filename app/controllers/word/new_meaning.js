import Ember from 'ember';
import EmberValidations from 'ember-validations';

export default Ember.ObjectController.extend( EmberValidations.Mixin,
{
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
  posList: ["adv", "adj", "verb", "noun"],
  wordEntry: function() {
    var pos = this.get("pos");
    return this.get("word").then(
      function(word) {
        return word.entryForPos(pos);
      }
    );
  }.property("model.pos"),
  actions: {
    submitProposal: function() {
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
    cancel: function() {
      this.get("model").destroy();
      this.transitionToRoute("word.index", this.get("word"));
    }
  }
});
