
import Ember from 'ember';
/* globals moment */

export default Ember.Component.extend({
  messagedAt: function() {
    return moment(this.get("message.createdAt")).fromNow();
  }.property("message.createdAt", "hup.at"),
});
