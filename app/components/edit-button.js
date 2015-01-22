import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    clickEdit: function() {
      console.log("send action")
      this.sendAction();
    }
  }
});
