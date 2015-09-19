import Ember from 'ember';
import ResetScrollMixin from '../mixins/reset_scroll';

export default Ember.Route.extend(ResetScrollMixin, {
  setupController(controller, model) {
    this._super(controller, model);
    controller.set("activities", this.store.findAll('activity'));
  },
});
