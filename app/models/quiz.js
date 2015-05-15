import DS from 'ember-data';

export default DS.Model.extend({
  lang: DS.belongsTo("lang"),
  title: DS.attr("string"),
  image_url: DS.attr("string"),
  instructions: DS.attr("string"),
  questions: DS.attr(),
  results: DS.attr(),
});
