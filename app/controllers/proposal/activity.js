import Ember from "ember";

export default Ember.Controller.extend({
  templateName: Ember.computed("model.type", function() {
    return "proposal/" + this.get("model.type").dasherize() + "-activity";
  }),
  isYae: Ember.computed("model.voteValue", function() {
    return this.get("model.voteValue") > 0;
  }),
});
