import Ember from 'ember';

export default Ember.Route.extend({
  afterModel(model) {
    this._super(model);
    Ember.$(document).attr('title', 'Quizzes from Wordset');
  },
  model() {
    return this.store.find('quiz');
  },
});
