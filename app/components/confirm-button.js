import Ember from 'ember';

export default Ember.Component.extend({
  isConfirm: false,
  actions: {
    showConfirm: function() {
      this.set("isConfirm", true);
    },
  }
});
