import Ember from 'ember';

export default Ember.Component.extend({
  seqs: Ember.computed.alias("proposal.changes.seq"),
  meanings: Ember.computed.alias("proposal.changes.meaning"),
});
