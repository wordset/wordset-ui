import Ember from 'ember';

export default Ember.ArrayController.extend({
  sortProperties: ['createdAt'],
  sortAscending: false
});
