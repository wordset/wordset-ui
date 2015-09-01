import Ember from 'ember';
import ENV from '../config/environment';
import ResetScrollMixin from '../mixins/reset_scroll';

export default Ember.Route.extend(ResetScrollMixin, {
  meta: Ember.inject.service(),
  model(params) {
    const key = params.lang + "-" + params.seq;
    const _this = this;
    return Ember.$.getJSON(ENV.api + "/seqs/" + key).then(
      (data) => {
        _this.store.pushPayload('wordset', data);
        return _this.store.peekRecord('seq', key);
      }
    );
  },
  afterModel(model) {
    this._super(model);
    if(Ember.isEmpty(model)) {
      this.notifier.error("No such word found!");
      this.transitionTo("application");
    }
  },
  setupController(controller, model) {
    this._super(controller, model);
    controller.set("isEditing", false);
    controller.set("reason", "");
    this.set("meta.title", 'What does \"' + model.get("text") + '\" mean?');
  }
});
