import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    var word = this.modelFor('word');
    var entries = word.get("entries");
    return this.store.createRecord('suggestion', {word: word, jsonText: JSON.stringify(entries, null, 2)});
  }
});
