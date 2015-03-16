import Ember from 'ember';

export default Ember.Component.extend({
  tagName: "notification",
  notifier: Ember.inject.service(),

  actions: {
    removeNotification: function() {
      this.get("notifier").remove(this.get("notification"));
    }
  }
});
