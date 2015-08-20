import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.store.find('proposal', {wordset_id: this.modelFor("seq.wordset").get("id")});
  }
});
