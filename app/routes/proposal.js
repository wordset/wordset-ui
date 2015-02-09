import Ember from 'ember';

export default Ember.Route.extend({
  afterModel: function(proposal) {
    // this.transitionTo("proposal." + proposal.get("type").dasherize(), proposal);
  }
});
