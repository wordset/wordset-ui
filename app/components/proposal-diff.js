import Ember from 'ember';

export default Ember.Component.extend({
  seqs: Ember.computed.alias("proposal.changes.seqs"),
  meanings: Ember.computed.alias("proposal.changes.meanings"),

  posListAndMeanings: Ember.computed("proposal.changes.meanings.[]", function() {
    var results = {};
    if(!Ember.isEmpty(this.get("proposal.changes.meanings"))) {
      (this.get("proposal.changes.meanings.[]") || []).forEach( function(meaning) {
        var pos = meaning.pos;
        results[pos] = results[pos] || [];
        return results[pos].push(meaning);
      });
      var posList = [];
      Object.keys(results).forEach(function(pos) {
        posList.pushObject([pos, results[pos]]);
      });
      return posList;
    }
    return [];
  }),

});
