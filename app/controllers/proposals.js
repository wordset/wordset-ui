import Ember from 'ember';

export default Ember.ArrayController.extend({
  sortProperties: ['createdAt'],
  sortAscending: false,
  queryParams: 'page',
  page: 1,
  total: Ember.computed("model", function() {
    return this.store.metadataFor("proposal").total;
  }),
  totalPages: Ember.computed('limit', 'total', function() {
    return Math.floor(Math.abs(this.get("total") / this.get("limit")));
  }),
  prevPage: Ember.computed('page', function() {
    return this.get("page") - 1;
  }),
  nextPage: Ember.computed('page', function() {
    return this.get('page') + 1;
  }),
  hasPreviousPage: Ember.computed('offset', function() {
    return this.get('offset') !== 0;
  }),
  hasNextPage: Ember.computed('offset', 'limit', 'total', function() {
    return (this.get('offset') + this.get('limit')) < this.get('total');
  }),
});
