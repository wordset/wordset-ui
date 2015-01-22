import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    commitSuggestion: function() {
      console.log("Router notified");
    }
  }
});
