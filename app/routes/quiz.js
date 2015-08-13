import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    return this.store.find('quiz', params.id);
  },
  setupController(controller, model) {
    this._super(controller, model);
    controller.set("selections", {});
  },
  afterModel(model) {
    this._super(model);
    Ember.$(document).attr('title', 'Quiz: ' + model.get("title"));
  },
});
