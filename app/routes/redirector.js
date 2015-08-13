import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel(transition) {
    this.transitionTo(transition.queryParams.url);
  }
});
