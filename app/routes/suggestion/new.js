import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    var word = this.modelFor('word')
    return this.store.createRecord('suggestion', {word: word, entries: JSON.stringify(word.get("entries"), null, 2)});
  }
});
