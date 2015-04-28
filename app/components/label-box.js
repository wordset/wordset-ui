import Ember from "ember";

export default Ember.Component.extend({
  setup: function() {
    this.set("isChecked", this.get("selectedLabels").contains(this.get("label")));
  }.on("willInsertElement"),
  updateSelection: function() {
    if(this.get("isChecked") == true) {
      this.get("selectedLabels").addObject(this.get("label"));
    } else if(this.get("isChecked") == false ) {
      this.get("selectedLabels").removeObject(this.get("label"));
    };
  }.observes("isChecked")
});
