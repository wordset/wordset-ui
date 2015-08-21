// This is really the creation of
// a new meaning proposal

import Ember from "ember";

export default Ember.Controller.extend({
  actions: {
    submitProposal() {
      var _this = this;
      this.tracker.log("propose", "new word");
      this.get("model").save().then(
        function(p) {
          _this.transitionToRoute("proposal.index", p);
        },
        function() {}
        );
    },
  }


});
