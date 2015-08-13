import Ember from 'ember';
import ENV from '../config/environment';

export default Ember.Service.extend({
  visible: Ember.inject.service(),
  browserNotifications: [],
  newMessage(data) {
    let body = data.text;
    let tag = data.user.id;
    let title = data.user.id;
    if(this.get("visible.now") === false) {
      var opt = {body: body, tag: tag, icon: "/assets/images/square-logo.png"};
      var n = new Notification(title, opt);
      this.get("browserNotifications").addObject(n);
    }
  },
  clearNotifications: Ember.observer("visible.now", function() {
    if(this.get("visible.now") === true) {
      this.get("browserNotifications").forEach(function(n) {
        n.close();
      });
      this.set("browserNotifications", []);
    }
  }),
});
