import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    return this.store.find('user');
  },
  afterModel: function(model) {
    this._super(model);
    Ember.$(document).attr('title', 'Top Contributors');
  }
});
