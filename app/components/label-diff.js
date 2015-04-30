import Ember from "ember";

export default Ember.Component.extend({
  addedLabels: function() {
    var _this = this;
    return this.get("newLabels").filter(function(item) {
      return !_this.get("originalLabels").contains(item);
    });
  }.property("newLabels.@each", "originalLabels.@each"),

  removedLabels: function() {
    var _this = this;
    return this.get("originalLabels").filter(function(item) {
      return !_this.get("newLabels").contains(item);
    });
  }.property("newLabels.@each", "originalLabels.@each"),

  sameLabels: function() {
    var _this = this;
    return this.get("newLabels").filter(function(item) {
      return _this.get("originalLabels").contains(item);
    });
  }.property("newLabels.@each", "originalLabels.@each")
});
