import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    return this.store.filter('proposal', { flagged: false }, function(proposal) {
      return !proposal.get('flagged');
    });
  }
});
