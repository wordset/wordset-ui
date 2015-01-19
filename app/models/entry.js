import DS from 'ember-data';

export default DS.Model.extend({
  pos: DS.attr("string"),
  word: DS.belongsTo("word"),
  meanings: DS.hasMany("meanings")
});
