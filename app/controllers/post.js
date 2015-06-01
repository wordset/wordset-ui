import Ember from 'ember';
/* global moment */

export default Ember.Controller.extend({
  needs: ['application'],
  html: function() {
    return Ember.String.htmlSafe(this.get("model.text"));
  }.property("model.text"),
  formattedDate: function() {
    return moment(this.get('model.publishedAt')).format("LL");
  }.property("model.publishedAt"),
  //activeProject: Ember.computed.alias("currentLang.project"),
  currentLang: Ember.computed.alias("controllers.application.currentLang"),
  postsSimple: Ember.computed.alias("currentLang.postsSimple"),
});
