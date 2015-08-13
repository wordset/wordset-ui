import Ember from 'ember';

export default Ember.Route.extend({
  model() /*params*/{
    return this.store.createRecord('proposal', {
      type: 'NewWordset',
      meanings: [{label_ids: []}],
      lang: this.modelFor("words")
    });
  },
});
