// This is really the creation of
// a new meaning proposal

import Ember from "ember";
import EmberValidations, {validator} from 'ember-validations';
import ENV from '../../config/environment';

export default Ember.Controller.extend(EmberValidations, {
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
