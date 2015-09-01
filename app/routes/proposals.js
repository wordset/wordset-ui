import Ember from 'ember';
import ResetScrollMixin from '../mixins/reset_scroll';

export default Ember.Route.extend(ResetScrollMixin, {
  meta: Ember.inject.service(),
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
  setupController(controller, model) {
    this._super(controller, model);
    this.set("meta.title", 'Proposals from Wordset');
    controller.setProperties({
      offset: this.get('offset'),
      limit: this.get('limit')
    });
  },
});
