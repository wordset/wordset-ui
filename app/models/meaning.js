import DS from 'ember-data';

var Meaning = DS.Model.extend({
  def: DS.attr('string'),
  quotes: DS.hasMany('quotes')
});

export default Meaning;
