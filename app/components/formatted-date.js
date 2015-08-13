import Ember from "ember";
/* global moment */

export default Ember.Component.extend({
  cleanDate: Ember.computed("date", function() {
    return moment(this.get("date")).format("LL");
  }),
});
