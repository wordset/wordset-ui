// This is really the creation of
// a new meaning proposal

import Ember from "ember";
import EmberValidations, {validator} from 'ember-validations';
import ENV from '../../config/environment';

export default Ember.Controller.extend(EmberValidations, {
  seqId: null,
  proposalId: null,
  validations: {
    "model.wordName": {
      inline: validator(function() {
        var name = this.get("model.model.wordName");

        var _this = this;
        if(name && (name.length > 0)) {
          Ember.$.getJSON(ENV.api + "/proposals/new-word-status/" + name).then(
            function(resp) {
              _this.set("model.seqId", "");
              _this.set("model.proposalId", "");
              if(!resp.can) {
                if(resp.seq_id) {
                  _this.set("model.seqId", resp.seq_id);
                  _this.get("errors").addObject("This word already exists");
                } else if(resp.proposal_id) {
                  _this.set("model.proposalId", resp.proposal_id);
                  _this.get("errors").addObject("There is an open proposal for this word");
                }
              }
            }
          );
        } else {
          return "It needs the actual word! :)";
        }
      })
    },
  },
  posList: Ember.computed("model.lang", function() {
    return this.get("model.lang.parts");
  }),

  canRemove: Ember.computed("model.meanings.[]", function() {
    return this.get("model").get("meanings").length > 1;
  }),

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
    addMeaning() {
      this.get("model").get("meanings").addObject({label_ids: []});
    },
    removeMeaning(meaning) {
      this.get("model").get("meanings").removeObject(meaning);
    },
    seeExistingWord() {
      this.transitionTo("seq.wordset.index", this.get("model.lang.id"), this.get("seqId"));
    }
  }


});
