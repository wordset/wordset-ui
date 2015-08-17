import Ember from "ember";

export default Ember.Component.extend({
  store: Ember.inject.service("store"),
  newLabels: Ember.computed("newLabelIds.[]", function() {
    var _this = this;
    if(Ember.isEmpty(this.get("newLabelIds"))) {
      return [];
    }
    return this.get("newLabelIds").map(function(id) {
      return _this.get("store").find("label", id);
    });
  }),
  originalLabels: Ember.computed("originalLabelIds.[]", function() {
    var _this = this;
    if(Ember.isEmpty(this.get("originalLabelIds"))) {
      return [];
    }
    return this.get("originalLabelIds").map(function(id) {
      return _this.get("store").find("label", id);
    });
  }),
  addedLabels: Ember.computed("newLabels.[]", "originalLabels.[]", function() {
    var _this = this;
    return this.get("newLabels").filter(function(item) {
      return !_this.get("originalLabels").contains(item);
    });
  }),

  removedLabels: Ember.computed("newLabels.[]", "originalLabels.[]", function() {
    var _this = this;
    return this.get("originalLabels").filter(function(item) {
      return !_this.get("newLabels").contains(item);
    });
  }),

  sameLabels: Ember.computed("newLabels.[]", "originalLabels.[]", function() {
    var _this = this;
    return this.get("newLabels").filter(function(item) {
      return _this.get("originalLabels").contains(item);
    });
  })
});
