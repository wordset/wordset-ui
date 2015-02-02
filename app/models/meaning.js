import DS from 'ember-data';

var Meaning = DS.Model.extend({
  def: DS.attr("string"),
  example: DS.attr("string"),
  entry: DS.belongsTo("entry"),
  proposals: DS.hasMany("proposals", {async: true}),
  hasProposal: DS.attr("boolean"),

  proposableType: "meaning",
  proposableFields: ["def", "example"],

  word: function() {
    return this.get("entry").get("word");
  },
  activeProposals: function() {
    return this.get('proposals').filterBy("state", "new");
  }.property('proposals.@each'),
  locked: function() {
    return (this.get('activeProposals').length > 0);
  }.property("proposals.@each")
});


export default Meaning;
