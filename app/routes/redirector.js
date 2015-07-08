import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
    return params.url;
  },
  setupController: function(controller, model) {
    this.transitionTo(model);
  }
});
