
import Ember from 'ember';
/* globals moment */

export default Ember.Component.extend({
  messagedAt: function() {
    return moment(this.get("message.createdAt")).fromNow();
  }.property("message.createdAt", "hup.at"),
  scrollToBottom: function() {
    var messageWindow = Ember.$(".message-list")[0];
    messageWindow.scrollTop = messageWindow.scrollHeight;
    console.log("scrolling to bottom");
  }.on("didInsertElement")
});
