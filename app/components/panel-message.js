
import Ember from 'ember';

export default Ember.Component.extend({
  messagedAt: function() {
    return moment(this.get("message.createdAt")).fromNow();
  }.property("message.createdAt", "hup.at"),
});
