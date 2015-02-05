import DS from 'ember-data';
import Ember from 'ember';

var Proposal = DS.Model.extend({
  type: DS.attr("string"),
  user: DS.belongsTo("user"),
  word: DS.belongsTo("word", {async: true}),
  wordName: DS.attr("string"),
  reason: DS.attr("string"),
  state: DS.attr("string"),
  wordnet: DS.attr("boolean"),
  createdAt: DS.attr("date"),

  // NewWord
  meanings: DS.attr(),

  // MeaningLike
  def: DS.attr("string"),
  example: DS.attr("string"),

  // ChangeMeaning
  meaning: DS.belongsTo("meaning"),
  original: DS.attr(),
  parentId: DS.attr(),

  // NewMeaning
  pos: DS.attr("string"),

  types: ["NewWord", "NewMeaning", "MeaningChange"],
});

export default Proposal;
