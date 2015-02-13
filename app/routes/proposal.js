import Ember from 'ember';

export default Ember.Route.extend({

  afterModel: function(model) {
    var word = this.modelFor('proposal').get('wordName');
    Ember.$(document).attr('title', word + ' – proposal from Wordset');
  }
});
