import Ember from 'ember';

export default Ember.Service.extend({
  at: null,
  init() {
    this._super();
    this.to();
  },
  to() {
    this.set("at", new Date());
  },
});
