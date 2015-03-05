import DS from 'ember-data';

export default DS.Model.extend({
  text: DS.attr("string"),
  user: DS.belongsTo("user"),
  createdAt: DS.attr("date"),
  type: DS.attr("string"),
  url: DS.attr("string"),
  isLink: function() {
    return this.get("type") === "link";
  }.property("type"),
  isSelf: function() {
    return this.get("type") === "self";
  }.property("type"),
});
