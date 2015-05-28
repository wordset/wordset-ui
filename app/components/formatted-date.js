import Ember from "ember";

export default Ember.Component.extend({
  cleanDate: function() {
    console.log(this.get("date"));
    return moment(this.get("date")).format("LL");
  }.property("date"),
});
