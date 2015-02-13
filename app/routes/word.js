import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
    return this.store.find('word', params.word_id);
  },

  afterModel: function(model) {
    // var artistName = this.modelFor('word').get('name');
    // $(document).attr('title', artistName + ' songs - Rock & Roll');
  }
});
