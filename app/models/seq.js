import DS from 'ember-data';

export default DS.Model.extend({
  wordset: DS.belongsTo("wordset"),
  text: DS.attr("string"),
  lang: DS.belongsTo("lang"),
});
