import DS from 'ember-data';

export default DS.Model.extend({
  lang: DS.belongsTo('lang', {
    async: false
  }),
  title: DS.attr("string"),
  imageUrl: DS.attr("string"),
  imageCitation: DS.attr("string"),
  imageLink: DS.attr("string"),
  instructions: DS.attr("string"),
  questions: DS.attr(),
  results: DS.attr(),
});
