import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    return this.store.createRecord("proposal", {
      word: this.modelFor("word"),
      action: "create",
      delta: Ember.Object.create(),
    });
  }
});
