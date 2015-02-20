import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    return this.store.createRecord('user');
  },
  afterModel: function(model) {
    Ember.$(document).attr('title', 'Register');
  }
});
