import Ember from 'ember';

export default Ember.Component.extend(EmberValidations, {
  actions: {
    addNewMeaning() {
      this.get("changes.meanings").pushObject(new Object({action: "add", def: "", example: "", labels: []}));
    },
    addNewSeq() {
      this.get("changes.seqs").pushObject(new Object({action: "add", text: "", labels: []}));
    },
  }
});
