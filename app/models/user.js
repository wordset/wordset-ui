import DS from 'ember-data';

export default DS.Model.extend({
  password: DS.attr("string"),
  email: DS.attr("string"),
  proposals: DS.hasMany("proposals"),
  points: DS.attr("number"),
  imageUrl: DS.attr("string"),
  createdAt: DS.attr('date'),
  rank: DS.attr("string"),
  votes: DS.hasMany("votes"),

  // Only for registration purposes
  emailOptIn: DS.attr("boolean"),
  acceptTos: DS.attr("boolean"),
});
