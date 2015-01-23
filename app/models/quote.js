import DS from 'ember-data';

export default DS.Model.extend({
  text: DS.attr("string"),
  source: DS.attr("string"),
  url: DS.attr("string"),
  meaning: DS.belongsTo("meaning"),
  suggestions: DS.hasMany("suggestions"),

  suggestableType: "quote",
  suggestableFields: ["text", "source", "url"],
  suggestableChildren: [],

  word: function() {
    return this.get("meaning").word();
  },
  activeSuggestions: function() {
    return this.get('suggestions').filterBy("state", "new");
  }.property('suggestions.@each'),
  locked: function() {
    return (this.get('activeSuggestions').length > 0);
  }.property("suggestions.@each")
});
