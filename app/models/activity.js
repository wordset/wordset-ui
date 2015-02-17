import DS from 'ember-data';

export default DS.Model.extend({
  user: DS.belongsTo("user"),
  proposal: DS.belongsTo("proposal"),
  word: DS.belongsTo("word"),

  createdAt: DS.attr("date"),

  type: DS.attr("string"),
  comment: DS.attr("string"), // Vote
  voteValue: DS.attr("number"), // Vote
  finalState: DS.attr("string"), // ProposalClosed

});
