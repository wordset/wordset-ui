import DS from 'ember-data';

export default DS.Model.extend({
  wordset: DS.belongsTo('wordset', {
    async: false
  }),
  text: DS.attr("string"),
  lang: DS.belongsTo('lang', {
    async: false
  }),
  labels: DS.hasMany('labels', {
    async: false
  }),
});
