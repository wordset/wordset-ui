import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.store.find('user');
  },
  afterModel(model) {
    this._super(model);
    Ember.$(document).attr('title', 'Top Contributors');
  }
});
