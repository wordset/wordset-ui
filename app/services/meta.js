import Ember from 'ember';

export default Ember.Service.extend({
  init: function() {
    this.domDescription = Ember.$("#meta-description");
    this.document = Ember.$(document);

    this.set("description", this.domDescription.attr("content"));
    this.set("originalDescription", this.get("description"));
    this.set("title", this.document.attr("title"));
    this.set("originalTitle", this.document.attr("title"));
  },
  updateHeader: Ember.observer('title', 'description', function() {
    this.domDescription.attr("content", this.get("description"));
    this.document.attr("title", this.get("title"));
  }),
  reset: function() {
    this.set("description", this.get("originalDescription"));
    this.set("title", this.get("originalTitle"));
  }
});
