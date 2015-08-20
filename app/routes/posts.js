import Ember from 'ember';

export default Ember.Route.extend({
  afterModel(model) {
    this._super(model);
    Ember.$(document).attr('title', 'Blog Posts from Wordset');
  },
  model() {
    return this.store.find('post');
  },
});
