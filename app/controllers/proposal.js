import EmberValidations from 'ember-validations';
import ENV from '../config/environment';

export default Ember.ObjectController.extend( EmberValidations.Mixin, {
  posList: ENV.posList,
  needs: ['application'],
  isAdmin: Ember.computed.alias('controllers.application.isAdmin'),
  currentUser: Ember.computed.alias('controllers.application.currentUser'),
  isOpen: function() {
    return (this.get("state") === "open");
  }.property("state"),
  isNewMeaning: function() {
    return ("NewMeaning" === this.get("type"));
  }.property("type"),
  isMine: function() {
    return (this.get("user") === this.get("currentUser"))
  }.property("user", "currentUser"),
  isNewWord: function() {
    return ("NewWord" === this.get("type"));
  }.property("type"),
  isMeaningChange: function() {
    return ("MeaningChange" === this.get("type"));
  }.property("type"),
  positiveTally: function() {
    if(this.get("tally") > 0 ) {
      return "width: " + this.get("tally") + "%;";
    } else {
      return "";
    }
  }.property("tally"),
  negativeTally: function() {
    if(this.get("tally") < 0 ) {
      return "width: " + (this.get("tally") * -1) + "%;";
    } else {
      return "";
    }
  }.property("tally"),
  canEdit: function() {
    return (this.get("isOpen") && this.get("isMine"));
  }.property("isOpen", "isMine"),
  actions: {
    startEdit: function() {
      this.set("isEditing", true);
      console.log(this.get("posList"));
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
  }
});
