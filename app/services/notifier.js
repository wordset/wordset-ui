import Ember from 'ember';

export default Ember.Service.extend({

  notifications: [],

  show: function(text, options) {
    if(typeof options !== "object") {
      options = { };
    }
    options.text = text;

    this.get("notifications").addObject(options);
  },

  error: function(text, options) {
    if(typeof options !== "object") {
      options = {};
    }
    options.type = "error";

    this.show(text, options);
  },

  remove: function(notification) {
    Ember.run.later(this, function() {
      this.get("notifications").removeObject(notification);
    }, 3000);
  }

});
