import Ember from 'ember';

export default Ember.Route.extend({
  meta: Ember.inject.service(),
  setupController(controller, model) {
    this._super(controller, model);

    this.set("meta.title", 'Post: ' + model.get("title"));
    if(!Ember.isBlank(model.get('description'))) {
      this.set("meta.description", model.get("description"));
    }
  }
});
