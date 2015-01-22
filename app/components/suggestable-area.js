//Super class for editable display items.
import Ember from 'ember';

export default Ember.Component.extend({
  displayEdit: (function() {
    return (this.get("mode") === "edit");
  }).property("mode"),
  canEdit: (function() {
    return (this.get("mode") != "locked");
  }).property("mode"),
  actions: {
    editMode: function() {
      this.set("mode", "edit");
      console.log("chaning mode");
    },
    submitSuggestion: function() {
      this.set("mode", "locked");
      this.sendAction("action", this.get('model'));
      console.error("IMPLEMENT SUGGESTING OR SOME SHIT");
    },
    cancel: function() {
      this.get("model").rollback();
      this.set("mode", "show");
    }
  }
});
