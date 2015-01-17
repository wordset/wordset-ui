import Ember from 'ember';

export default Ember.ObjectController.extend({
  error: "",
  hasErrors: false,

  actions: {
    save: function() {
      var _this = this;
      this.get("model").save().then(function(){
        _this.flash.notice("Submitted!")
      }, function(errors) {
        // Couldn't save, do nothing about it.
        _this.set("isError", true);
        _this.flash.warning('Oops! Looks like something was amiss.');
        console.log(errors);
      });
    }
  },

  changeJSON: function() {
    var json = this.get("jsonText");
    try {
      this.set("error", "")
      var entries = JSON.parse(json);
      this.get("model").set("entries", entries);
      console.log(entries);
    }
    catch (e) {
      this.set("error", e)
      return
    }

  }.observes("jsonText"),

  updateErrorFlag: function() {
    this.set("hasErrors", this.get("error") !== "")
  }.observes("error")
})
