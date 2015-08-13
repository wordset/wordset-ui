import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    clickEdit() {
      this.sendAction();
    }
  }
});
