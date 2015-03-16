import Ember from 'ember';

export default Ember.Component.extend({
  tagName: "notification",
  classNameBindings: [":animated", ":slideInUp", "notification.type"],
  notifier: Ember.inject.service(),

  actions: {
    removeNotification: function() {
      this.get("notifier").remove(this.get("notification"));
    }
  }
});
