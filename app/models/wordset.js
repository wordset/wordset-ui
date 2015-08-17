import DS from 'ember-data';

export default DS.Model.extend({
  seqs: DS.hasMany('seqs', {
    async: false
  }),
  meanings: DS.hasMany('meanings', {
    async: false
  }),
  proposals: DS.hasMany('proposals', {async: true}),
  name: DS.attr('string'),
  lang: DS.belongsTo('lang', {
    async: false
  }),

  generateInitialChangeSet() {
    var changeSet = {};
    changeSet.seqs = this.get("seqs").map((seq) => seq.returnChangeSet());
    changeSet.meanings = this.get("meanings").map((m) => m.returnChangeSet());
    return changeSet;
  },

});
