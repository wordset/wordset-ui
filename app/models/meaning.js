import DS from 'ember-data';

var Meaning = DS.Model.extend({
  def: DS.attr("string"),
  example: DS.attr("string"),
  entry: DS.belongsTo("entry"),
  hasProposal: DS.attr("boolean"),
  openProposal: DS.belongsTo("proposal", {async: true}),

  wordset: function() {
    return this.get("entry").get("word");
  },
});


export default Meaning;
