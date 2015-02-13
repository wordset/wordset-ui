import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    return this.store.find("word");
  },
  afterModel: function(words) {
    this.transitionTo("word.index", words.get("lastObject"));
  }
});
