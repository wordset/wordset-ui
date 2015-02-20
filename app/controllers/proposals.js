import Ember from 'ember';

export default Ember.ArrayController.extend({
  sortProperties: ['createdAt'],
  sortAscending: false,
  queryParams: 'page',
  page: 1,
  total: function() {
    return this.store.metadataFor("proposal").total;
  }.property("model"),
  totalPages: function() {
    return Math.floor(Math.abs(this.get("total") / this.get("limit")));
  }.property('limit', 'total'),
  prevPage: function() {
    return this.get("page") - 1;
  }.property('page'),
  nextPage: function() {
    return this.get('page') + 1;
  }.property('page'),
  hasPreviousPage: function() {
    return this.get('offset') !== 0;
  }.property('offset'),
  hasNextPage: function() {
    return (this.get('offset') + this.get('limit')) < this.get('total');
  }.property('offset', 'limit', 'total'),
  actions: {
    previousPage: function() {
      var totalPages = Math.ceil(this.get('total')/this.get('limit'));
    }
  }
});
