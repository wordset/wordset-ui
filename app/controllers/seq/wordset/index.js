import Ember from "ember";

export default Ember.Controller.extend({
  showMeaningProposal: false,
  newMeaningProposal: false,

  posListAndMeanings: Ember.computed("model.meanings.[]", function() {
    var results = {};

    this.get("model.meanings.[]").forEach( function(meaning) {
      var pos = meaning.get("pos");
      results[pos] = results[pos] || [];
      return results[pos].push(meaning);
    });
    var posList = [];
    Object.keys(results).forEach(function(pos) {
      posList.pushObject([pos, results[pos]]);
    })
    return posList;
  }),
});
