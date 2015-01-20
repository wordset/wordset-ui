import DS from 'ember-data';

var Meaning = DS.Model.extend({
  def: DS.attr("string"),
  entries: DS.belongsTo("entry"),
  quotes: DS.hasMany("quotes"),

  suggestableType: "meaning",
  suggestableFields: ["def"],
  suggestableChildren: ["quotes"],
});

Meaning.reopenClass({

});

export default Meaning;
