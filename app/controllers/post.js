import Ember from 'ember';
/* global moment */

export default Ember.Controller.extend({
  needs: ['application'],
  html: Ember.computed("model.text", function() {
    return Ember.String.htmlSafe(this.get("model.text"));
  }),
  formattedDate: Ember.computed("model.publishedAt", function() {
    return moment(this.get('model.publishedAt')).format("LL");
  }),
  //activeProject: Ember.computed.alias("currentLang.project"),
  currentLang: Ember.computed.alias("controllers.application.currentLang"),
  postsSimple: Ember.computed.alias("currentLang.postsSimple"),
});
