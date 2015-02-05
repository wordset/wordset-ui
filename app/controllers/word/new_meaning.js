import Ember from 'ember';

export default Ember.ObjectController.extend({
  posList: ["adv", "adj", "verb", "noun"],
  proposalDelta: Ember.Object.create(),
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
    }
  }
});
