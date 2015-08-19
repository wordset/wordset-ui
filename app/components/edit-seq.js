import Ember from 'ember';
import EmberValidations from 'ember-validations';

export default Ember.Component.extend( EmberValidations, {
  classNames: ["edit-seq-inputs"],
  validations: {
    "seq.text": {
      presence: true,
    },
  },
  actions: {
    remove() {
      if(this.get("seq.action") === "add") {
        this.get("targetObject.changes.seqs").removeObject(this.get("seq"));
      }
    },
  }
});
