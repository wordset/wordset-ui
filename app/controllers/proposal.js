import Ember from 'ember';
import ENV from '../config/environment';

export default Ember.Controller.extend({
  posList: ENV.posList,
  application: Ember.inject.controller("application"),
  currentUser: Ember.computed.alias('application.currentUser'),
  justVoted: false,
  invalidEdit: false,
  isLoading: false,
  isOpen: Ember.computed("model.state", function() {
    return (this.get("model.state") === "pending");
  }),
  isMine: Ember.computed("model.user.id", "currentUser.id", function() {
    return (this.get("model.user.id") === this.get("currentUser.id"));
  }),
  canChange: Ember.computed("isOpen", "isMine", function() {
    return (this.get("isOpen") && this.get("isMine"));
  }),
  isDeletion: Ember.computed("model.changes", function() {
    // This is a function to test whether all the changes are remove
    // meanings. We create an array, push each change type to it,
    // then remove all that are "removes". If there's nothing left,
    // we know it's a total meaning removal.
    var actions = [];
    this.get("model.changes.meanings.[]").forEach( function(meaning) {
      actions.push(meaning.action)
    });
    actions = actions.without("remove");
    return Ember.isEmpty(actions);
  }),
  actions: {
    startEdit() {
      this.set("isEditing", true);
    },
    submitEdit() {
      var _this = this;
      this.tracker.log("proposal", "edit");
      this.set("isLoading", true);
      this.get("model").save().then(
        function(model) {
          _this.set("isEditing", false);
          _this.set("isLoading", false);
        },
        function() {
          _this.set("isLoading", false);
          _this.set("isEditing", false);
        }
      );
    },
    withdraw() {
      var _this = this;
      this.set("isLoading", true);
      Ember.$.post(ENV.api + "/proposals/" + this.model.get("id") + "/withdraw",
      {}, function(data) {
        _this.store.pushPayload('proposal', data);
        _this.tracker.log("proposal", "withdraw");
        _this.set("isLoading", false);
      });
    },
    cancelEdit() {
      this.get("model").reload();
      this.set("isEditing", false);
    },
  }
});
