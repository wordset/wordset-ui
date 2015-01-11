import Ember from 'ember';
import ApplicationRouteMixin from 'simple-auth/mixins/application-route-mixin';

export default Ember.Route.extend(ApplicationRouteMixin).extend({
  model: function() {
    return this.store.find('word_list');
  }
});
