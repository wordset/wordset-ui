import Ember from 'ember';

export default Ember.Controller.extend({
  isEditing: false,
  showBanner: Ember.computed("session.isAuthenticated", function() {
    return !this.get("session").get("isAuthenticated");
  }),
  actions: {
    startEditing: function() {
      this.set("isEditing", true);
      this.set("changeSet", this.get("model.wordset").generateInitialChangeSet());
    }
  }
});
