import Ember from "ember";

export default Ember.Component.extend({
  setup: Ember.on("willInsertElement", function() {
    this.set("isChecked", this.get("selectedLabels").contains(this.get("labelKey")));
  }).observes("selectedLabels"),
  labelKey: Ember.computed("label", function() {
    return this.get("label.id");
  }),
  checkedWhenDisabled: Ember.computed("isChecked", function() {
    return this.get("isChecked");
  }),
  lookDisabled: Ember.computed("disabled", function() {
    return this.get("disabled");
  }),
  parentChecked: Ember.computed("parentState", function() {
    return this.get("parentState");
  }),
  updateSelection: Ember.observer("isChecked", function() {
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
  }),
  updateChecked: Ember.observer("parentState", function () {
    if(this.get("parentState") === false) {
      this.set("isChecked", false);
    }
  }),
});
