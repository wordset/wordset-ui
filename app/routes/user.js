import Ember from 'ember';

export default Ember.Route.extend({
  setupController: function(controller, user) {
    this._super(controller, user);
    this.store.find('proposal', {user_id: user.id});
  },

});
