import DS from 'ember-data';

export default DS.Model.extend({
  pos: DS.attr('string'),
  meanings: DS.hasMany('meanings')
});
