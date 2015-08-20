import Ember from 'ember';
import ENV from '../config/environment';

export default Ember.Route.extend({
  model(params) {
    const key = params.lang + "-" + params.seq;
    const _this = this;
    return Ember.$.getJSON(ENV.api + "/seqs/" + key).then(
      (data) => {
        _this.store.pushPayload('wordset', data);
        return _this.store.getById('seq', key);
      }
    );
  },
  afterModel(model) {
    this._super(model);
    if(Ember.isEmpty(model)) {
      this.notifier.error("No such word found!");
      this.transitionTo("application");
    } else {
      this.tracker.log("word", "viewed");
      Ember.$(document).attr('title', 'What does \"' + model.get("text") + '\" mean?');
    }
  },
  setupController(controller, model) {
    this._super(controller, model);
    controller.set("isEditing", false);
  }
});
