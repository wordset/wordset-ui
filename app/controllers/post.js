import Ember from 'ember';
/* global moment */

export default Ember.Controller.extend({
  application: Ember.inject.controller("application"),
  currentLang: Ember.computed.alias("application.currentLang"),
  postsSimple: Ember.computed.alias("currentLang.postsSimple"),
  html: Ember.computed("model.text", function() {
    return Ember.String.htmlSafe(this.get("model.text"));
  }),
  formattedDate: Ember.computed("model.publishedAt", function() {
    return moment(this.get('model.publishedAt')).format("LL");
  }),
});
