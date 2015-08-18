import Ember from "ember";

export default Ember.Component.extend({
  children: Ember.computed("applicableLabels.[]", "parentLabel.id", function() {
    return this.get("applicableLabels").filterBy("parent", this.get("parentLabel"));
  }),
  allChildrenChecked: Ember.computed("selectedLabels.[]", function() {
    var _this = this;
    return this.get("children").every(function(label) {
      return _this.get("selectedLabels").contains(label);
    });
  }),
  allChildrenUnchecked: Ember.computed("selectedLabels.[]", function() {
    var _this = this;
    return !this.get("children").any(function(label) {
      return _this.get("selectedLabels").contains(label);
    });
  }),
  disabledParent: Ember.computed("allChildrenUnchecked", "parentChecked", function() {
    return (this.get("parentChecked") && !this.get("allChildrenUnchecked"));
  })
});
