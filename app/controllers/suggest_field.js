import Ember from 'ember';

export default Ember.ObjectController.extend({
  needs: ["word"],
  post: Ember.computed.alias("controllers.word"),
  isEditing: false,
  actions: {
    editMeaning: function() {
      this.set("isEditing", true);
      console.log(this.get("isEditing"));
    },
    submitSuggestion: function() {
      var suggestion = this.store.createRecord("suggestion");
      suggestion.changeModel(this.get("model"));
      suggestion.save();
      this.set("isEditing", false);
    }
  }
});
