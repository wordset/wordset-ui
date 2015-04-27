import DS from 'ember-data';

var Meaning = DS.Model.extend({
  def: DS.attr("string"),
  example: DS.attr("string"),
  pos: DS.attr("string"),
  hasProposal: DS.attr("boolean"),
  openProposal: DS.belongsTo("proposal", {async: true}),
  wordset: DS.belongsTo("wordset"),
  labels: DS.hasMany("labels"),
});


export default Meaning;
