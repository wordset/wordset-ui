import Ember from 'ember';
import ResetScrollMixin from '../mixins/reset_scroll';

export default Ember.Route.extend(ResetScrollMixin, {
  offset: 0,
  limit: 25,
  flagged: false,
  queryParams: {
    page: {
      refreshModel: true
    }
  },
  activate() {
    this._super();
    window.scrollTo(0,0);
  },
  model(params) {
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
  afterModel(model) {
    this._super(model);
    Ember.$(document).attr('title', 'Proposals from Wordset');
  },
  setupController(controller, model) {
    this._super(controller, model);
    controller.setProperties({
      offset: this.get('offset'),
      limit: this.get('limit')
    });
  },
});
