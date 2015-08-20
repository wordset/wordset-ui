import Ember from 'ember';

export default Ember.Route.extend({
  model() /*params*/{
    return this.store.createRecord('proposal', {
      changes: {meanings: [{
        action: "add",
        original: {},
        labels: [],
      }], seqs: [{
        action: "add",
        original: {},
        labels: [],
      }]},
      lang: this.modelFor("words"),
    });
  },
});
