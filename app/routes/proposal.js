import Ember from 'ember';
import Proposal from '../models/proposal'

export default Ember.Route.extend({

  model: function(params) {
    return this.store.find('proposal', params.proposal_id);
  },

  afterModel: function(model) {
    var word = this.modelFor('proposal').get('wordName');
    this.send("log", "viewed proposal");
    Ember.$(document).attr('title', word + ' – proposal from Wordset');
  },

  setupController: function(controller, model) {
    this._super(controller, model);
    this.controller.set("justVoted", false);
  },
});
