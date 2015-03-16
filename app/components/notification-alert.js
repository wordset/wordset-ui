import Ember from 'ember';

export default Ember.Component.extend({
  tagName: "notification",
  classNameBindings: [":animated", ":fadeIn", "notification.type", "deleted:fadeOut"],
  notifier: Ember.inject.service(),
  deleted: false,

  actions: {
    removeNotification: function() {
      this.set("deleted", true)
      this.get("notifier").remove(this.get("notification"));
    }
  }
});
