import Ember from 'ember';

export default Ember.Component.extend({
  notifier: Ember.inject.service(),
  store: Ember.computed.alias("targetObject.store"),
});
