import Ember from 'ember';

export default Ember.ArrayController.extend({
  needs: ['application'],
  activeProject: Ember.computed.alias("currentLang.project"),
  currentLang: Ember.computed.alias("controllers.application.currentLang"),
  postsSimple: Ember.computed.alias("currentLang.postsSimple"),
});
