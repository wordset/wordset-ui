import Ember from "ember";

export default Ember.Component.extend({
  setup: function() {
    this.set("isChecked", this.get("selectedLabels").contains(this.get("labelKey")));
  }.on("willInsertElement").observes("selectedLabels"),
  labelKey: function() {
    if(this.get("useId")) {
      return this.get("label.id");
    } else {
      return this.get("label");
    }
  }.property("label"),
  checkedWhenDisabled: function() {
    return this.get("isChecked");
  }.property("isChecked"),
  lookDisabled: function() {
    return this.get("disabled");
  }.property("disabled"),
  parentChecked: function() {
    return this.get("parentState");
  }.property("parentState"),
  updateSelection: function() {
    if((this.get("isChecked") === true)) {
      if(this.get("type") === "child") {
        this.set("parentState", true);
      }
      this.get("selectedLabels").addObject(this.get("labelKey"));
    } else {
      if(this.get("type") === "parent") {
        this.get("selectedLabels").removeObjects(this.get("label.children"));
      }
      this.get("selectedLabels").removeObject(this.get("labelKey"));
    }
  }.observes("isChecked"),
  updateChecked: function () {
    if(this.get("parentState") === false) {
      this.set("isChecked", false);
    }
  }.observes("parentState"),
});
