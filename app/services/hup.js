import Ember from 'ember';

export default Ember.Service.extend({
  at: null,
  init: function() {
    this._super();
    this.to();
  },
  to: function() {
    this.set("at", new Date());
  },
});
