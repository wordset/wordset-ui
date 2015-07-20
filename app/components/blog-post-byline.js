import Ember from 'ember';
/* global moment */

export default Ember.Component.extend({
  formattedDate: function() {
    return moment(this.get("post.published_at")).format("LL");
  }.property("post.published_at")
});
