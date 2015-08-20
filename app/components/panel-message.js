
import Ember from 'ember';
/* globals moment */

export default Ember.Component.extend({
  messagedAt: Ember.computed("message.createdAt", "hup.at", function() {
    return moment(this.get("message.createdAt")).fromNow();
  }),
  scrollToBottom: Ember.on("didInsertElement", function() {
    var messageWindow = Ember.$(".message-list")[0];
    messageWindow.scrollTop = messageWindow.scrollHeight;
  })
});
