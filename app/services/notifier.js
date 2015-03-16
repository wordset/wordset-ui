import Ember from 'ember';

export default Ember.Service.extend({

  notifications: [],

  show: function(text, options) {
    if(typeof options !== "object") {
      options = {};
    }
    options.text = text;

    this.get("notifications").addObject(options);

    Ember.run.later(this, function() {
      this.get("notifications").removeObject(options);
    }, 2500);

  },

  remove: function(notification) {
    this.get("notifications").removeObject(notification);
  }

});
