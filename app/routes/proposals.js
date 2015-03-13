import Ember from 'ember';

export default Ember.Route.extend({
  offset: 0,
  limit: 25,
  flagged: false,
  queryParams: {
    page: {
      refreshModel: true
    }
  },
  activate: function() {
    this._super();
    window.scrollTo(0,0);
  },
  model: function(params) {
    var page;
    if(params.page) {
      page = params.page;
      page = isNaN(page) ? 1 : Math.floor(Math.abs(page));
      this.set('offset', (page-1) * this.get('limit'));
    }
    return this.store.find('proposal',
          {
            offset: this.get('offset'),
            limit: this.get('limit'),
            flagged: this.get('flagged')
          });
  },
  afterModel: function(model) {
    Ember.$(document).attr('title', 'Proposals from Wordset');
  },
  setupController: function(controller, model){
    this._super(controller, model);
    controller.setProperties({
      offset: this.get('offset'),
      limit: this.get('limit')
    });
  },
});
