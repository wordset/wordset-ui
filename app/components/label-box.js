import Ember from "ember";

export default Ember.Component.extend({
  setup: function() {
    this.set("isChecked", this.get("selectedLabels").contains(this.get("labelKey")));
  }.on("willInsertElement"),
  labelKey: function() {
    if(this.get("useId")) {
      return this.get("label.id");
    } else {
      return this.get("label");
    }
  }.property("label"),
  updateSelection: function() {
    if(this.get("isChecked") == true) {
      this.get("selectedLabels").addObject(this.get("labelKey"));
    } else if(this.get("isChecked") == false ) {
      this.get("selectedLabels").removeObject(this.get("labelKey"));
    };
  }.observes("isChecked")
});
