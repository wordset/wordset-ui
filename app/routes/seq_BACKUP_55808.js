import Ember from 'ember';
import ENV from '../config/environment';
import ResetScrollMixin from '../mixins/reset_scroll';

<<<<<<< HEAD
export default Ember.Route.extend(ResetScrollMixin, {
=======
export default Ember.Route.extend({
  meta: Ember.inject.service(),
>>>>>>> 76515f9f00c12879fb152b63ad9f0584bd885f54
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
