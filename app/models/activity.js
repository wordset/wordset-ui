import DS from 'ember-data';

export default DS.Model.extend({
  userId: DS.attr("string"),
  proposalId: DS.attr("string"),
  wordId: DS.attr("string"),

  createdAt: DS.attr("date"),

  type: DS.attr("string"),
  comment: DS.attr("string"), // Vote or Comment
  voteValue: DS.attr("number"), // Vote
  finalState: DS.attr("string"), // ProposalClosed
  newLevel: DS.attr("string"), // UserPromotion

});
