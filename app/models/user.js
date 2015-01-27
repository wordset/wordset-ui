import DS from 'ember-data';

export default DS.Model.extend({
  password: DS.attr("string"),
  email: DS.attr("string"),
  proposals: DS.hasMany("proposals"),
  points: DS.attr()
});
