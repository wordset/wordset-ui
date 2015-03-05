import EmberValidations from 'ember-validations';
import ENV from '../config/environment';
import { Bindings } from 'ember-pusher/bindings';

export default Ember.ObjectController.extend(Bindings, EmberValidations.Mixin, {
  logPusherEvents: true,
  PUSHER_SUBSCRIPTIONS: {
    proposals: ['push']
  },
  posList: ENV.posList,
  needs: ['application'],
  isAdmin: Ember.computed.alias('controllers.application.isAdmin'),
  currentUser: Ember.computed.alias('controllers.application.currentUser'),
  justVoted: false,
  isOpen: function() {
    return (this.get("state") === "open");
  }.property("state"),
  isMine: function() {
    return (this.get("user") === this.get("currentUser"))
  }.property("user", "currentUser"),
  canChange: function() {
    return (this.get("isOpen") && this.get("isMine"));
  }.property("isOpen", "isMine"),
  partialName: function() {
    return "proposal/" + this.get("model.type").dasherize();
  }.property("type"),
  actions: {
    startEdit: function() {
      this.set("isEditing", true);
    },
    submitEdit: function() {
      var _this = this;
      this.send("log", "edited proposal");
      this.get("model").save().then(
        function(model) {
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
        })
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
