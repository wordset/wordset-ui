import Ember from "ember";

export default Ember.Component.extend({
  parentDialects: function() {
    return this.get("labels").filterBy("isDialect", true).filterBy("parent", null);
  }.property("labels"),
  parentLabels: function() {
    return this.get("labels").filterBy("isDialect", false).filterBy("parent", null);
  }.property("labels"),
  debug: function() {
    var _this = this;
    console.log("Labels", this.get("selectedLabels").mapBy("name"));
  }.observes("selectedLabels.@each"),
});
