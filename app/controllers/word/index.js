import Ember from "ember";

export default Ember.Controller.extend({
  showMeaningProposal: false,
  newMeaningProposal: false,
  actions: {
    toggleShowAddMeaning: function() {
      this.set("newMeaningProposal", this.store.createRecord("proposal", {
        type: "NewMeaning",
        word: this.get("model"),
        wordName: this.get("model").get("name"),
      }));
      this.set("showMeaningProposal", true);
    },
    cancelShowAddMeaning: function() {
      this.store.unloadRecord(this.get("newMeaningProposal"));
      this.set("showMeaningProposal", false);
    }
  }
});
