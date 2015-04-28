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
    cancelShowAddMeaning: function() {
      this.store.unloadRecord(this.get("newMeaningProposal"));
      this.set("showMeaningProposal", false);
    }
  }
});
