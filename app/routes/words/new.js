import Ember from 'ember';

export default Ember.Route.extend({
  model: function(/*params*/) {
    return this.store.createRecord('proposal', {
      type: 'NewWordset',
      meanings: [{label_ids: []}],
      lang: this.modelFor("words")
    });
  },
  setupController: function(controller, model) {
    this._super(controller, model);
  },
});
