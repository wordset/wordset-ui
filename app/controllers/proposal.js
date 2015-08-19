import Ember from 'ember';
import ENV from '../config/environment';

export default Ember.Controller.extend({
  posList: ENV.posList,
  application: Ember.inject.controller("application"),
  currentUser: Ember.computed.alias('application.currentUser'),
  justVoted: false,
  isOpen: Ember.computed("model.state", function() {
    return (this.get("model.state") === "pending");
  }),
  isMine: Ember.computed("model.user.id", "currentUser.id", function() {
    return (this.get("model.user.id") === this.get("currentUser.id"));
  }),
  canChange: Ember.computed("isOpen", "isMine", function() {
    return (this.get("isOpen") && this.get("isMine"));
  }),
  actions: {
    startEdit() {
      this.set("isEditing", true);
    },
    submitEdit() {
      var _this = this;
      this.tracker.log("proposal", "edit");
      _this.transitionToRoute("loading");
      this.get("model").save().then(
        function(model) {
          _this.set("isEditing", false);
          _this.transitionToRoute("proposal", model.get("id"));
        },
        function() {}
      );
    },
    withdraw() {
      var _this = this;
      Ember.$.post(ENV.api + "/proposals/" + this.model.get("id") + "/withdraw",
      {}, function(data) {
        _this.store.pushPayload('proposal', data);
        _this.tracker.log("proposal", "withdraw");
      });
    },
    cancelEdit() {
      this.get("model").reload();
      this.set("isEditing", false);
    },
  }
});
