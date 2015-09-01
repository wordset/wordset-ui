import Ember from 'ember';

export default Ember.Route.extend({
  meta: Ember.inject.service(),
  model() {
    return this.store.createRecord('user', { emailOptIn: true });
  },
  afterModel(model) {
    this._super(model);
    this.set('meta.title', 'Register');
  }
});
