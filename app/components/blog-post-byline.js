import Ember from 'ember';
/* globals moment */

export default Ember.Component.extend({
  formattedDate: Ember.computed("post.published_at", function() {
    return moment(this.get("post.published_at")).format("LL");
  })
});
