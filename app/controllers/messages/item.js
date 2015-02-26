import Ember from "ember";

export default Ember.ObjectController.extend({
  isSelf: function() {
    return ("self" === this.get("type"));
  }.property("type"),
});
