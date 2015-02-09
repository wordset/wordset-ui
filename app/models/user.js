import DS from 'ember-data';

export default DS.Model.extend({
  password: DS.attr("string"),
  email: DS.attr("string"),
  proposals: DS.hasMany("proposals"),
  points: DS.attr(),
  imageUrl: DS.attr("string"),
  createdAt: DS.attr('date'),
  rank: DS.attr("string"),
  votes: DS.hasMany("votes"),

  isAdmin: function() {
    return (this.get("rank") === "Admin");
  }.property("rank"),
});
