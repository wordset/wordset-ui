import DS from 'ember-data';

var Proposal = DS.Model.extend({
  type: DS.attr("string"),
  user: DS.belongsTo("user"),
  word: DS.belongsTo("word", {async: true}),
  wordName: DS.attr("string"),
  reason: DS.attr("string"),
  state: DS.attr("string"),
  wordnet: DS.attr("boolean"),
  createdAt: DS.attr("date"),
  tally: DS.attr("number"),
  votes: DS.hasMany("vote"),
  activities: DS.hasMany("activity"),
  flagged: DS.attr("boolean"),

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

  typeName: function() {
    if(this.get("type") === "NewWord") {
      return "New Word";
    } else if(this.get("type") === "NewMeaning") {
      return "New Meaning";
    } else if(this.get("type") === "MeaningChange") {
      return "Change";
    }
  }.property("type"),

});

export default Proposal;
