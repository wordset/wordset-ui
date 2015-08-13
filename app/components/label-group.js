import Ember from "ember";

export default Ember.Component.extend({
  allChildrenChecked: Ember.computed("selectedLabels.[]", function() {
    var _this = this;
    return this.get("parentLabel.children").every(function(label) {
      return _this.get("selectedLabels").contains(label);
    });
  }),
  allChildrenUnchecked: Ember.computed("selectedLabels.[]", function() {
    var _this = this;
    return !this.get("parentLabel.children").any(function(label) {
      return _this.get("selectedLabels").contains(label);
    });
  }),
  disabledParent: Ember.computed("allChildrenUnchecked", "parentChecked", function() {
    return (this.get("parentChecked") && !this.get("allChildrenUnchecked"));
  })
});
