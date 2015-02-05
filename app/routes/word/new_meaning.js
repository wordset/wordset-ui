import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    var word = this.modelFor("word");
    return this.store.createRecord("proposal", {
      word: word,
      type: "NewMeaning",
    });
  }
});
