import Ember from 'ember';

export default Ember.Controller.extend({
  needs: ['application'],
  activeProject: Ember.computed.alias("currentLang.project"),
  currentLang: Ember.computed.alias("controllers.application.currentLang"),
  postsSimple: Ember.computed.alias("currentLang.postsSimple"),
  topPostsSimple: Ember.computed("postsSimple.[]", function() {
    return this.get("postsSimple").slice(0, 2);
  }),
});
