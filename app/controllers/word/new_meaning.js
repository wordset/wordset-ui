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
  proposalTarget: function() {
    var _this = this.get("model");
    var wordId = this.get("word").get("id");
    var pos = this.get("pos");
    var delta = this.get("proposalDelta");
    this.get("wordEntry").then(function(entry) {
      if(entry) {
        _this.set("targetType", "Entry");
        _this.set("targetId", entry.get("id"));
        _this.set("createClassName", "Meaning");
        _this.set("delta", delta);
      } else {
        _this.set("targetType", "Word");
        _this.set("targetId", wordId);
        _this.set("createClassName", "Entry");
        _this.set("delta", {
          pos: pos,
          meanings: [delta],
        });
      }
    });
  }.observes("pos", "proposalDelta.def", "proposalDelta.example"),
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
