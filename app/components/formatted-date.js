import Ember from "ember";
/* global moment */

export default Ember.Component.extend({
  cleanDate: function() {
    return moment(this.get("date")).format("LL");
  }.property("date"),
});
