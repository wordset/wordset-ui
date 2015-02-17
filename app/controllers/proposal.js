import Ember from 'ember';

export default Ember.ObjectController.extend({
  posList: ["adv", "adj", "verb", "noun"],
  needs: ['application'],
  isAdmin: Ember.computed.alias('controllers.application.isAdmin'),
  currentUser: Ember.computed.alias('controllers.application.currentUser'),
  isOpen: function() {
    return (this.get("state") === "open");
  }.property("state"),
  isNewMeaning: function() {
    return ("NewMeaning" === this.get("type"));
  }.property("type"),
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
    return this.get("isOpen") && (this.get("currentUser") === this.get("user"));
  }.property("isOpen", "currentUser", "user"),
  actions: {
    startEdit: function() {
      this.set("isEditing", true);
      console.log(this.get("posList"));
    },
    submitEdit: function() {
      var _this = this;
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
    cancelEdit: function() {
      this.get("model").rollback();
      this.set("isEditing", false);
    }
  }
});
