//Super class for editable display items.
import Ember from 'ember';

export default Ember.Component.extend({
  displayEdit: (function() {
    if(this.get("mode") === "edit") {
      return true;
    }
    return false;
  }).property("mode"),
  canEdit: (function() {
    if(this.get("mode") === "locked") {
      return false;
    } else {
      return !this.get("model").get("locked");
    }
  }).property("model", "mode"),
  actions: {
    editMode: function() {
      this.set("mode", "edit");
    },
    submitSuggestion: function() {
      this.set("mode", "locked");
      this.sendAction("action", this.get('model'), this.get('reason'));
      //console.error("IMPLEMENT SUGGESTING OR SOME SHIT");
    },
    cancel: function() {
      this.get("model").rollback();
      this.set("mode", "show");
    }
  }
});
