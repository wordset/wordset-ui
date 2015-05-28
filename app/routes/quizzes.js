import Ember from 'ember';

export default Ember.Route.extend({
  afterModel: function(model) {
    this._super(model);
    Ember.$(document).attr('title', 'Quizzes from Wordset');
  },
  model: function() {
    return this.store.find('quiz');
  },
});
