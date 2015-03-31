import Ember from 'ember';

export default Ember.Component.extend({
  isConfirm: false,
  actions: {
    showConfirm: function() {
      this.toggleProperty("isConfirm");
    },
    confirm: function() {
      this.toggleProperty("isConfirm");
      this.sendAction("action", this.get("param"));
    },
  }
});
