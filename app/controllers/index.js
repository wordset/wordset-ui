import Ember from 'ember';

export default Ember.ArrayController.extend({
  needs: ['application'],
  activeProject: Ember.computed.alias("controllers.application.activeProject"),
});
