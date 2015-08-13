import Ember from 'ember';

export default Ember.Controller.extend({
  showBanner: Ember.computed("session.isAuthenticated", function() {
    return !this.get("session").get("isAuthenticated");
  }),
});
