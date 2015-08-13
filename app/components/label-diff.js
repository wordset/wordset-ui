import Ember from "ember";

export default Ember.Component.extend({
  addedLabels: Ember.computed("newLabels.@each", "originalLabels.@each", function() {
    var _this = this;
    return this.get("newLabels").filter(function(item) {
      return !_this.get("originalLabels").contains(item);
    });
  }),

  removedLabels: Ember.computed("newLabels.@each", "originalLabels.@each", function() {
    var _this = this;
    return this.get("originalLabels").filter(function(item) {
      return !_this.get("newLabels").contains(item);
    });
  }),

  sameLabels: Ember.computed("newLabels.@each", "originalLabels.@each", function() {
    var _this = this;
    return this.get("newLabels").filter(function(item) {
      return _this.get("originalLabels").contains(item);
    });
  })
});
