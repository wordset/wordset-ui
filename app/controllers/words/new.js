// This is really the creation of
// a new meaning proposal

import Ember from "ember";
import EmberValidations from 'ember-validations';
import ENV from '../../config/environment';

export default Ember.Controller.extend(EmberValidations.Mixin, {
  seqId: null,
  proposalId: null,
  wordIsGood: false,
  validations: {
    "model.wordName": {
      inline: EmberValidations.validator(function() {
        var name = this.get("model.model.wordName");
        var _this = this;

        //new variable to use to determine what to do in focus out method
        if(name && (name.length > 0)) {
          Ember.$.getJSON(ENV.api + "/proposals/new-word-status/" + name).then(
            function(resp) {
              _this.set("model.seqId", "");
              _this.set("model.proposalId", "");
              _this.set("model.wordIsGood", true);
              //problem seems to occur after / during the execution of the two lines above
              if(!resp.can) {
                if(resp.seq_id) {
                  _this.set("model.seqId", resp.seq_id);
                  _this.get("errors").addObject("This word already exists");
                  _this.set("model.wordIsGood", false);
                } else if(resp.proposal_id) {
                  _this.set("model.proposalId", resp.proposal_id);
                  _this.get("errors").addObject("There is an open proposal for this word");
                  _this.set("model.wordIsGood", false);
                }
              }
            }
          );

        } else {
          console.log(this.get("model.wordName"));
          //return "It needs the actual word! :)";
          _this.set("model.wordIsGood", false);
          _this.get("errors").addObject("It needs the actual word! :)");
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
      this.get("model").get("meanings").addObject({label_ids: []});
    },
    removeMeaning: function(meaning) {
      this.get("model").get("meanings").removeObject(meaning);
    },
    seeExistingWord: function() {
      this.transitionTo("seq.wordset.index", this.get("model.lang.id"), this.get("seqId"));
    },
    //new method
    focusout: function(){
      if(wordIsGood){
        console.log("wordisgood");
      }
    }
  }


});
