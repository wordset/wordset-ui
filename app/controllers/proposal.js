import Ember from 'ember';
import ENV from '../config/environment';

export default Ember.Controller.extend({
  posList: ENV.posList,
  needs: ['application'],
  currentUser: Ember.computed.alias('controllers.application.currentUser'),
  justVoted: false,
  isOpen: function() {
    return (this.get("model.state") === "open");
  }.property("model.state"),
  isMine: function() {
    return (this.get("model.user.id") === this.get("currentUser.id"));
  }.property("model.user.id", "currentUser.id"),
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
        function() {}
      );
    },
    withdraw: function() {
      var _this = this;
      Ember.$.post(ENV.api + "/proposals/" + this.model.get("id") + "/withdraw",
      {}, function(data) {
        _this.store.pushPayload('proposal', data);
        _this.send("log", "proposal", "withdraw");
      });
    },
    cancelEdit: function() {
      this.get("model").rollback();
      this.set("isEditing", false);
    },
  }
});
