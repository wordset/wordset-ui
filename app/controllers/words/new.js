// This is really the creation of
// a new meaning proposal

import Ember from "ember";

export default Ember.ObjectController.extend({
  posList: ["adv", "adj", "verb", "noun"],

  canRemove: function() {
    return this.get("model").get("meanings").length > 1
  }.property("model.meanings.@each"),

  actions: {
    submitProposal: function() {
      var _this = this;
      this.get("model").save().then(
        function(p) {
          _this.transitionToRoute("proposal.index", p);
        },
        function() {}
        );
    },
    addMeaning: function() {
      this.get("model").get("meanings").addObject({});
    },
    removeMeaning: function(meaning) {
      this.get("model").get("meanings").removeObject(meaning);
    }
  }


});
