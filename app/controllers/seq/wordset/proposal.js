import Ember from 'ember';
/* global moment */

export default Ember.Controller.extend({
  formattedDate: function() {
    var date = this.get("model.createdAt");
    return moment(date).format("LL");
  }.property("model.createdAt"),
});
