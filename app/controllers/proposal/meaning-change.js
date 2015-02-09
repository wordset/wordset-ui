import Ember from 'ember';

export default Ember.ObjectController.extend({
  actions: {
    hello: function() {
      console.log("hi!");
    }
  }
});
