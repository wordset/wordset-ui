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
  sortProperties: ['createdAt'],
  sortAscending: true,
  validations: {
    text: {
      presence: true,
      length: { minimum: 1, maximum: 255 },
    },
  },
  actions: {
    submitMessage: function() {
      var _this = this;
      Ember.$.post(ENV.api + "/messages", {
        message: {
          text: this.get("text"),
        },
      });
      _this.set("text", "");
    },
    push: function(data) {
      this.store.pushPayload('message', data);
    }
  }
});
