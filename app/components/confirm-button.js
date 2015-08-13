import Ember from 'ember';

export default Ember.Component.extend({
  isConfirm: false,
  actions: {
    showConfirm() {
      this.toggleProperty("isConfirm");
    },
    confirm() {
      this.toggleProperty("isConfirm");
      this.sendAction("action", this.get("param"));
    },
  }
});
