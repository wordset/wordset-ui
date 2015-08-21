import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    return this.store.findRecord('proposal', params.proposal_id);
  },
  afterModel(model) {
    if(Ember.isBlank(model.get("changes"))) {
      model.reload();
    }
    this._super(model);
    var word = this.modelFor('proposal').get('wordName');
    this.tracker.log("proposal", "viewed");
    Ember.$(document).attr('title', word + ' – proposal from Wordset');
  },
  setupController(controller, model) {
    this._super(controller, model);
    controller.set("isEditing", false);
    controller.set("isLoading", false);
  }
});
