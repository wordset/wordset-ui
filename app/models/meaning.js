import DS from 'ember-data';

var Meaning = DS.Model.extend({
  def: DS.attr("string"),
  example: DS.attr("string"),
  pos: DS.attr("string"),
  hasProposal: DS.attr("boolean"),
  openProposal: DS.belongsTo('proposal', {async: true}),
  wordset: DS.belongsTo('wordset', {
    async: false
  }),
  labels: DS.hasMany('labels', {
    async: false
  }),

  returnChangeSet() {
    return {
      action: "modify",
      def: this.get("def"),
      example: this.get("example"),
      labels: this.get("labels").map((l) => l.get("id")),
      pos: this.get("pos"),
      meaning_id: this.get("id"),
      original: {
        def: this.get("def"),
        example: this.get("example"),
        labels: this.get("labels").map((l) => l.get("id")),
      }
    }
  },
});


export default Meaning;
