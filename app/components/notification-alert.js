import Ember from 'ember';

export default Ember.Component.extend({
  tagName: "notification",
  classNameBindings: [":animated", ":fadeIn", "notification.type", "deleted:fadeOut"],
  notifier: Ember.inject.service(),
  deleted: false,

  didClick: Ember.on("click", function() {
    if(!this.get("deleted")) {
      if(this.get("notification.route")) {
        this.get("targetObject").transitionToRoute.apply(this.get("targetObject"), this.get("notification.route"));
      }
      this.send("removeNotification");
    }
  }),

  didInsertElement() {
    this._super();
    Ember.run.later(this, function() {
      this.send("removeNotification");
    }, 2500);
  },

  actions: {
    removeNotification() {
      this.set("deleted", true);
      this.get("notifier").remove(this.get("notification"));
    }
  }
});
