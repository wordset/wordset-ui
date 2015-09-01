import Ember from 'ember';

export default Ember.Controller.extend({
  featuredProject: Ember.computed.alias("currentLang.project"),
  application: Ember.inject.controller("application"),
  currentLang: Ember.computed.alias("application.currentLang"),
  postsSimple: Ember.computed.alias("currentLang.postsSimple"),
  topPostsSimple: Ember.computed("postsSimple.[]", function() {
    return this.get("postsSimple").slice(0, 2);
  }),
});
