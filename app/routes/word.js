import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
    return this.store.find('word', params.word_id);
  },

  afterModel: function(model) {
    var word = this.modelFor('word').get('id');
    Ember.$(document).attr('title', word + ' – definition from Wordset');
  }
});
