import Ember from 'ember';
import EmberValidations from 'ember-validations';

export default Ember.Component.extend(EmberValidations, {
  classNames: ["edit-interface"],
  validations: {
    'changes': {
      changeset: true,
    }
  },
  /* This is only required because ember-validations doesn't correctly observe child errors */
  runValidations: function() {
    this.validate();
  }.observes("hup.at"),
  actions: {
    addNewMeaning() {
      this.get("changes.meanings").pushObject(new Object({action: "add", def: "", example: "", labels: []}));
      this.validate();
    },
    addNewSeq() {
      this.get("changes.seqs").pushObject(new Object({action: "add", text: "", labels: []}));
      this.validate();
    },
  }
});
