import Ember from 'ember';
import EmberValidations from 'ember-validations';
import ENV from '../../config/environment';
import { Bindings } from 'ember-pusher/bindings';

export default Ember.ArrayController.extend(Bindings, EmberValidations.Mixin, {
  logPusherEvents: true,
  PUSHER_SUBSCRIPTIONS: {
    messages: ['push']
  },
  needs: ['application'],
  currentUser: Ember.computed.alias('controllers.application.currentUser'),
  chatReceived: Ember.computed.alias('controllers.application.chatReceived'),
  sortProperties: ['createdAt'],
  showUsers: false,
  sortAscending: true,
  onlineUsers: function() {
    return this.store.metadataFor("message").online || [];
  }.property("model.@each"),
  validations: {
    text: {
      presence: true,
      length: { minimum: 1, maximum: 255 },
    },
  },
  actions: {
    submitMessage: function() {
      if(this.get("isValid")) {
        var _this = this;
        Ember.$.post(ENV.api + "/messages", {
          message: {
            text: this.get("text"),
            path: document.location.pathname
          },
        });
      }
      this.set("text", "");
    },
    push: function(data) {
      this.set("chatReceived", true);
      this.store.pushPayload('message', data);
    },
    toggleUsers: function() {
      this.toggleProperty("showUsers");
    },
  }
});
