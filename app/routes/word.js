import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
    return this.store.find('word', params.word_id);
  },

  afterModel: function(model) {
    this._super(model);
    var word = this.modelFor('word').get('id');
    this.send("log", "word", "viewed");
    Ember.$(document).attr('title', 'What does \"' + word + '\" mean?');
  },

});
