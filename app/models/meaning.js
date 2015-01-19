import DS from 'ember-data';

export default DS.Model.extend({
  def: DS.attr("string"),
  entries: DS.belongsTo("entry"),
  quotes: DS.hasMany("quotes")
});
