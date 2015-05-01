import Ember from "ember";

export default Ember.Controller.extend({
  showMeaningProposal: false,
  newMeaningProposal: false,
  posList: function() {
    return this.get("model.lang.parts");
  }.property("model.lang"),
  actions: {
    toggleShowAddMeaning: function() {
      this.set("newMeaningProposal", this.store.createRecord("proposal", {
        type: "NewMeaning",
        wordset: this.get("model"),
        wordName: this.get("model").get("name"),
        lang: this.get("model").get("lang"),
      }));
      this.set("showMeaningProposal", true);
    },
    // Clean up the states if we are canceling the AddNewMeaning dialog
    cancelShowAddMeaning: function() {
      var _this = this;
      this.set("showMeaningProposal", false);
      // After we've hidden it... then remove it.
      Ember.run.later(function() {
        _this.store.unloadRecord(_this.get("newMeaningProposal"));
        _this.set("newMeaningProposal", null);
      });
    }
  }
});
