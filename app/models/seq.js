import DS from 'ember-data';

export default DS.Model.extend({
  wordset: DS.belongsTo('wordset', {
    async: false,
    inverse: "seqs"
  }),
  text: DS.attr("string"),
  lang: DS.belongsTo('lang', {
    async: false
  }),
  labels: DS.hasMany('labels', {
    async: false
  }),

  returnChangeSet() {
    return {
      action: "modify",
      text: this.get("text"),
      labels: this.get("labels").map((l) => l.get("id")),
      original: {
        labels: this.get("labels").map((l) => l.get("id"))
      }
    };
  },

});
