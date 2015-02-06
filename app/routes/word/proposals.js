import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    return this.store.find("proposal", {word_id: this.modelFor("word").get("id")});
  }
});
