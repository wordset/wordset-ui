import DS from 'ember-data';

export default DS.Model.extend({
  pos: DS.attr("string"),
  wordset: DS.belongsTo('wordset', {
    async: false
  }),
  meanings: DS.hasMany('meanings', {
    async: false
  })
});
