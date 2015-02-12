
import Ember from "ember";

export default Ember.ObjectController.extend({
  posList: ["adv", "adj", "verb", "noun"],

  actions: {
    submitProposal: function() {
      console.log(this.get("proposalTarget"));
    }
  }


});
