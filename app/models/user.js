import DS from 'ember-data';

export default DS.Model.extend({
  password: DS.attr("string"),
  email: DS.attr("string"),
  suggestions: DS.hasMany("suggestions"),
  points: DS.attr()
});
