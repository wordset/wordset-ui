import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.store.createRecord('user', { emailOptIn: true });
  },
  afterModel(model) {
    this._super(model);
    Ember.$(document).attr('title', 'Register');
  }
});
