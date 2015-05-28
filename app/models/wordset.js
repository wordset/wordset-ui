import DS from 'ember-data';

export default DS.Model.extend({
  seqs: DS.hasMany('seqs'),
  meanings: DS.hasMany('meanings'),
  proposals: DS.hasMany('proposals', {async: true}),
  name: DS.attr('string'),
  lang: DS.belongsTo('lang'),
});
