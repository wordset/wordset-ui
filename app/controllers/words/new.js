// This is really the creation of
// a new meaning proposal

import Ember from "ember";
import EmberValidations from 'ember-validations';
import ENV from '../../config/environment';

export default Ember.Controller.extend(EmberValidations.Mixin, {
  seqId: null,
  proposalId: null,
  validations: {
    "model.wordName": {
      inline: EmberValidations.validator(function() {
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
          // console.log(this.get("model.wordName"));
          return "It needs the actual word! :)";
        }
      })
    },
  },
  posList: function() {
    return this.get("model.lang.parts");
  }.property("model.lang"),

  canRemove: function() {
    return this.get("model").get("meanings").length > 1;
  }.property("model.meanings.@each"),

  actions: {
    submitProposal: function() {
      var _this = this;
      this.send("log", "propose", "new word");
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
    },
    seeExistingWord: function() {
      this.transitionTo("seq.wordset.index", this.get("model.lang.id"), this.get("seqId"));
    }
  }


});
