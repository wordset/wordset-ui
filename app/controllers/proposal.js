import Ember from 'ember';
import EmberValidations from 'ember-validations';
import ENV from '../config/environment';
import { Bindings } from 'ember-pusher/bindings';

export default Ember.Controller.extend(Bindings, EmberValidations.Mixin, {
  logPusherEvents: true,
  PUSHER_SUBSCRIPTIONS: {
    proposals: ['push']
  },
  posList: ENV.posList,
  needs: ['application'],
  currentUser: Ember.computed.alias('controllers.application.currentUser'),
  justVoted: false,
  isOpen: function() {
    return (this.get("model.state") === "open");
  }.property("model.state"),
  isMine: function() {
    return (this.get("model.user") === this.get("currentUser"));
  }.property("model.user", "currentUser"),
  canChange: function() {
    return (this.get("isOpen") && this.get("isMine"));
  }.property("isOpen", "isMine"),
  partialName: function() {
    return "proposal/" + this.get("model.type").dasherize();
  }.property("model.type"),
  actions: {
    startEdit: function() {
      this.set("isEditing", true);
    },
    submitEdit: function() {
      var _this = this;
      this.send("log", "proposal", "edit");
      this.get("model").save().then(
        function() {
          _this.set("isEditing", false);
        },
        function() {
          // apparently, just defining this function
          // makes everything work. weird.
        }
      );
    },
    withdraw: function() {
      var _this = this;
      if(this.get("isWithdrawing")) { //second click!
        Ember.$.post(ENV.api + "/proposals/" + this.model.get("id") + "/withdraw",
        {}, function(data) {
          _this.store.pushPayload('proposal', data);
          _this.send("log", "proposal", "withdraw");
        });
      } else {
        this.set("isWithdrawing", true);
      }
    },
    cancelEdit: function() {
      this.get("model").rollback();
      this.set("isEditing", false);
    },
    push: function(data) {
      this.store.pushPayload('proposal', data);
    },
  }
});
