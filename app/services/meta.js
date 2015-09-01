import Ember from 'ember';
import ENV from '../config/environment';

export default Ember.Service.extend({
  originalImage: ENV.uiHost + "/assets/images/full-logo.png",
  init: function() {
    this.domDescription = Ember.$("#meta-description");
    this.head = Ember.$("head");
    this.document = Ember.$(document);

    this.fb = {};
    ["image", "title", "description"].forEach((name) => {
      this.head.append("<meta property='og:" + name + "'>");
      this.fb[name] = Ember.$('head meta:last-child');
    });

    this.set("description", this.domDescription.attr("content"));
    this.set("originalDescription", this.get("description"));
    this.set("image", this.get("originalImage"));
    this.set("title", this.document.attr("title"));
    this.set("originalTitle", this.document.attr("title"));
    this.updateHeader();
  },
  updateHeader: Ember.observer('title', 'description', 'image', function() {
    this.domDescription.attr("content", this.get("description"));
    this.document.attr("title", this.get("title"));
    this.fb.image.attr("content", this.get("image"));
    this.fb.title.attr("content", this.get("title"));
    this.fb.description.attr("content", this.get("description"));
  }),
  reset: function() {
    this.set("description", this.get("originalDescription"));
    this.set("title", this.get("originalTitle"));
    this.set("image", this.get("originalImage"));
    this.updateHeader();
  }
});
