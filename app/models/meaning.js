import DS from 'ember-data';

var Meaning = DS.Model.extend({
  def: DS.attr("string"),
  example: DS.attr("string"),
  entry: DS.belongsTo("entry"),
  hasProposal: DS.attr("boolean"),
  openProposal: DS.belongsTo("proposal", {async: true}),

  word: function() {
    return this.get("entry").get("word");
  },
  activeProposals: function() {
    return this.get('proposals').filterBy("state", "new");
  }.property('proposals.@each'),
});


export default Meaning;
