import DS from 'ember-data';

var Meaning = DS.Model.extend({
  def: DS.attr("string"),
  entry: DS.belongsTo("entry"),
  quotes: DS.hasMany("quotes"),

  suggestableType: "meaning",
  suggestableFields: ["def"],
  suggestableChildren: ["quotes"],
  word: function() {
    return this.get("entry").get("word");
  }
});


export default Meaning;
