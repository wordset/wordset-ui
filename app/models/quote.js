import DS from 'ember-data';

export default DS.Model.extend({
  text: DS.attr("string"),
  source: DS.attr("string"),
  url: DS.attr("string"),
  meaning: DS.belongsTo("meaning"),

  suggestableType: "quote",
  suggestableFields: ["text", "source", "url"],
  suggestableChildren: [],

  word: function() {
    return this.get("meaning").word();
  }
});
