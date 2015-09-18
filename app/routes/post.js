import Ember from 'ember';
import ResetScrollMixin from '../mixins/reset_scroll';

export default Ember.Route.extend(ResetScrollMixin, {
  meta: Ember.inject.service(),
  setupController(controller, model) {
    this._super(controller, model);

    this.set("meta.title", model.get("title"));
    if(!Ember.isBlank(model.get('description'))) {
      this.set("meta.description", model.get("description"));
    }
  }
});
