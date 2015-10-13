import Ember from 'ember';

export default Ember.Controller.extend({

  application: Ember.inject.controller("application"),
  currentLang: Ember.computed.alias("application.currentLang"),
  postsSimple: Ember.computed.alias("currentLang.postsSimple"),
  topPostsSimple: Ember.computed("postsSimple.[]", function() {
    return this.get("postsSimple").slice(0, 2);
  }),
  featuredProject: Ember.computed("currentLang.project", function() {
    // if(this.get("currentLang.project.state") === "active") {
      return this.get("currentLang.project");
    // }
  }),
});
