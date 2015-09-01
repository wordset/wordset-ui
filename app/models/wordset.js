import DS from 'ember-data';

export default DS.Model.extend({
  seqs: DS.hasMany('seqs', {
    async: false,
    inverse: "wordset",
  }),
  meanings: DS.hasMany('meanings', {
    async: false
  }),
  pendingProposalId: DS.attr('string'),
  proposals: DS.hasMany('proposals', {async: true}),
  name: DS.attr('string'),
  lang: DS.belongsTo('lang', {
    async: false
  }),

  generateInitialChangeSet() {
    // console.log("Generating initial change set.");
    var changeSet = {};
    changeSet.seqs = this.get("seqs").map((seq) => seq.returnChangeSet());
    changeSet.meanings = this.get("meanings").map((m) => m.returnChangeSet());
    return changeSet;
  },

});
