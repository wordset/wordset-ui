import Ember from "ember";

export default Ember.Controller.extend({
  templateName: function() {
    return "dashboard/" + this.get("model.type").dasherize() + "-activity";
  }.property("model.type"),
  isYae: function() {
    return this.get("model.voteValue") > 0;
  }.property("model.voteValue")
});
