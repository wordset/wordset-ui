import Ember from 'ember';

export default Ember.ObjectController.extend({
  actions: {
    toggleShowAddMeaning: function() {
      this.toggleProperty("showAddMeaning");
    }
  }
});
