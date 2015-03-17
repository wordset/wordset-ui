import Ember from 'ember';

export default Ember.Component.extend({
  tagName: "notification",
  classNameBindings: [":animated", ":fadeIn", "notification.type", "deleted:fadeOut"],
  notifier: Ember.inject.service(),
  deleted: false,

  didInsertElement: function() {
    this._super();
    Ember.run.later(this, function() {
      this.send("removeNotification");
    }, 2500);
  },

  actions: {
    removeNotification: function() {
      this.set("deleted", true)
      this.get("notifier").remove(this.get("notification"));
    }
  }
});
