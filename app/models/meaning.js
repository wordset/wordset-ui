import DS from 'ember-data';

var Meaning = DS.Model.extend({
  def: DS.attr("string"),
  example: DS.attr("string"),
  entry: DS.belongsTo("entry"),
  suggestions: DS.hasMany("suggestions"),

  suggestableType: "meaning",
  suggestableFields: ["def", "example"],

  word: function() {
    return this.get("entry").get("word");
  },
  activeSuggestions: function() {
    return this.get('suggestions').filterBy("state", "new");
  }.property('suggestions.@each'),
  locked: function() {
    return (this.get('activeSuggestions').length > 0);
  }.property("suggestions.@each")
});


export default Meaning;
