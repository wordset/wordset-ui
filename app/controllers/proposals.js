import Ember from 'ember';

export default Ember.ArrayController.extend({
  sortProperties: ['sortOrder'],
  sortAscending: false
});
