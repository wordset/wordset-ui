import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    console.log("LOADING");
    return this.store.createRecord('user');
  }
});
