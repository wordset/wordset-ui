import Ember from 'ember';
import Base from 'ember-validations/validators/base';
import { definitionlike } from './definitionlike';
import { generic } from './generic';
import { sentencelike } from './sentencelike'

export default Base.extend({
  call() {
    var changes = this.model.get(this.property);
    var seqError = false;
    var meaningError = false;
    if(Ember.isEmpty(changes.seqs)) {
      this.errors.addObject("Must have at least one valid spelling.");
    } else {
      for(var i = 0; i < changes.seqs.length; i++) {
        var seq = changes.seqs[i];
        if(Ember.isBlank(seq.text) || (seq.text.length === 0)) {
          seqError = true;
        }
        if(seq.proposal_id) {
          seqError = true;
        }
      }
    }
    if(Ember.isEmpty(changes.meanings)) {
      this.errors.addObject("Must have at least one valid meaning.");
    } else {
      for(var i = 0; i < changes.meanings.length; i++) {

        var meaning = changes.meanings[i];
        if( (generic(meaning.def) !== false ) ||
            (definitionlike(meaning.def, meaning.pos) !== false)) {
          meaningError = true;
        }
        if(sentencelike(meaning.example) !== false) {
          meaningError = true;
        }
      }
    }

    if(seqError) {
      this.errors.addObject("One of the spellings above is invalid");
    }
    if(meaningError) {
      this.errors.addObject("One of the meanings above is invalid");
    }
  }
});
