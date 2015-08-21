import Ember from "ember";

export default Ember.Controller.extend({
  showMeaningProposal: false,
  newMeaningProposal: false,

  sortedMeanings: Ember.computed("model.meanings.[]", function() {
    var results = {};
    this.get("model.meanings.[]").forEach( function(meaning) {
      var pos = meaning.get("pos");
      results[pos] = results[pos] || [];
      return results[pos].push(meaning);
    });
    return results;
  }),
});
