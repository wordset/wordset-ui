import Ember from 'ember';
import ResetScrollMixin from '../../mixins/reset_scroll';

export default Ember.Route.extend(ResetScrollMixin, {
  model() {
    return this.store.find('user');
  },
  afterModel(model) {
    this._super(model);
    Ember.$(document).attr('title', 'Top Contributors');
  }
});
