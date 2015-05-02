import Ember from "ember";

export default Ember.Component.extend({
  allChildrenChecked: function() {
    var _this = this;
    return this.get("parentLabel.children").every(function(label) {
      return _this.get("selectedLabels").contains(label);
    });
  }.property("selectedLabels.@each"),
  allChildrenUnchecked: function() {
    var _this = this;
    return !this.get("parentLabel.children").any(function(label) {
      return _this.get("selectedLabels").contains(label);
    });
  }.property("selectedLabels.@each"),
  disabledParent: function() {
    return (this.get("parentChecked") && !this.get("allChildrenUnchecked"));
  }.property("allChildrenUnchecked", "parentChecked")
});
