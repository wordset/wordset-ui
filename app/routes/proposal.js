import Ember from 'ember';
import ResetScrollMixin from '../mixins/reset_scroll';

export default Ember.Route.extend(ResetScrollMixin, {
  meta: Ember.inject.service(),
  model(params) {
    return this.store.findRecord('proposal', params.proposal_id);
  },
  setupController(controller, model) {
    this._super(controller, model);
    controller.set("isEditing", false);
    controller.set("isLoading", false);

    if(Ember.isBlank(model.get("changes"))) {
      controller.set("isLoading", true);
      model.reload().then((model) => {
        controller.set("isLoading", false);
      });
    }

    var word = this.modelFor('proposal').get('wordName');
    this.tracker.log("proposal", "viewed");
    this.set('meta.title', word + ' – proposal from Wordset');
  }
});
