import Ember from 'ember';

export default Ember.Service.extend({

  notifications: [],

  show(text, options) {
    if(typeof options !== "object") {
      options = { };
    }
    options.text = text;

    this.get("notifications").addObject(options);
  },

  error(text, options) {
    if(typeof options !== "object") {
      options = {};
    }
    options.type = "error";

    this.show(text, options);
  },

  remove(notification) {
    Ember.run.later(this, function() {
      this.get("notifications").removeObject(notification);
    }, 3000);
  }

});
