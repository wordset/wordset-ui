import Ember from 'ember';

export default Ember.Route.extend({
  afterModel(model) {
    this._super(model);
    Ember.$(document).attr('title', 'Post: ' + model.get("title"));
  },
});
