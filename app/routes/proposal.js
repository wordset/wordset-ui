import Ember from 'ember';

export default Ember.Route.extend({
  afterModel: function(model) {
    this._super(model);
    var word = this.modelFor('proposal').get('wordName');
    this.send("log", "proposal", "viewed");
    Ember.$(document).attr('title', word + ' – proposal from Wordset');
  },
});
