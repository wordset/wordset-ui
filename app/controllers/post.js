import Ember from 'ember';
/* global moment */

export default Ember.Controller.extend({
  html: function() {
    return Ember.String.htmlSafe(this.get("model.text"));
  }.property("model.text"),
  formattedDate: function() {
    return moment(this.get('model.publishedAt')).format("LL");
  }.property("model.publishedAt")
});
