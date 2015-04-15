import Ember from 'ember';

export default Ember.Route.extend({
  model: function(/*params*/) {
    return this.store.createRecord('proposal', {
      type: 'NewWordset',
      meanings: [{}]
    });
  },
  setupController: function(controller, model) {
    this._super(controller, model);
    // TODO: Need to make this dynamic
    this.store.find("lang", "en").then( function(lang) {
      model.set("lang", lang)
    }, function() {} );
  },
});
