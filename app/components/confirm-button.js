import Ember from 'ember';

export default Ember.Component.extend({
  isConfirm: false,
  actions: {
    showConfirm: function() {
      console.log("Show confirm message");
      this.set("isConfirm", true);
    },
  }
});
