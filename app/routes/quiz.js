import Ember from 'ember';

export default Ember.Route.extend({
  meta: Ember.inject.service(),
  model(params) {
    return this.store.find('quiz', params.id);
  },
  setupController(controller, model) {
    this._super(controller, model);
    controller.set("selections", {});
    if(!Ember.isBlank(model.get('instructions'))) {
      this.set("meta.description", model.get("instructions"));
    }
    this.set("meta.image", model.get("imageUrl"));
    this.set("meta.title", model.get("title"));
  },
});
