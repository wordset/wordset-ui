import Ember from 'ember';
import EmberValidations from 'ember-validations';
import ENV from '../../config/environment';

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
  posList: ENV.posList,
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
      this.send("log", "propose new meaning");
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
