import Ember from 'ember';

export default Ember.Route.extend({
  meta: Ember.inject.service(),

  setupController(controller, model) {
    this._super(controller, model);
    this.set("meta.title", "Blog Posts from Wordset");
  },
  model() {
    return this.store.find('post');
  },
});
