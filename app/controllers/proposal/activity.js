import Ember from "ember";

export default Ember.ObjectController.extend({
  templateName: function() {
    return "proposal/" + this.get("type").dasherize() + "-activity";
  }.property("type"),
  isYae: function() {
    return this.get("voteValue") > 0;
  }.property("voteValue"),
});
