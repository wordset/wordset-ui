import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    var word = this.modelFor("wordset");
    return this.store.createRecord("proposal", {
      wordset: word,
      type: "NewMeaning",
    });
  }
});
