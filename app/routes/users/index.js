import Ember from 'ember';
import ResetScrollMixin from '../../mixins/reset_scroll';

export default Ember.Route.extend(ResetScrollMixin, {
  meta: Ember.inject.service(),
  model() {
    return this.store.find('user');
  },
  setupController(controller, model) {
    this._super(controller, model);
    this.set('meta.title', 'Top Contributors');
  }
});
