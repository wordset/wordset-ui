import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    return this.store.find('proposal', params.proposal_id, {alwaysReload: true});
  },
  afterModel(model) {
    this._super(model);
    var word = this.modelFor('proposal').get('wordName');
    this.tracker.log("proposal", "viewed");
    Ember.$(document).attr('title', word + ' – proposal from Wordset');
  },
  setupController(controller, model) {
    this._super(controller, model);
    controller.set("isEditing", false);
  }
});
