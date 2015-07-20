import Ember from 'ember';
import ENV from '../config/environment';

export default Ember.Route.extend({
  model: function() {
    return this.store.find("project");
  }
});
