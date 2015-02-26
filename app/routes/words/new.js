import Ember from 'ember';

export default Ember.Route.extend({
  queryParams: {
    wordName: {
      refreshModel: true
    }
  },
  model: function(params) {
    return this.store.createRecord('proposal', {
      type: 'NewWord',
      wordName: params.wordName,
      meanings: [{}]
    });
  }
});
