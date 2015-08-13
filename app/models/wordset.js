import DS from 'ember-data';

export default DS.Model.extend({
  seqs: DS.hasMany('seqs', {
    async: false
  }),
  meanings: DS.hasMany('meanings', {
    async: false
  }),
  proposals: DS.hasMany('proposals', {async: true}),
  name: DS.attr('string'),
  lang: DS.belongsTo('lang', {
    async: false
  }),

});
