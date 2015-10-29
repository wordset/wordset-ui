import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    return this.store.findRecord('user', params.user_id, { reload: true });
  },
  setupController(controller, user) {
    this._super(controller, user);
    this.store.find('proposal', {user_id: user.id});
  },
});
