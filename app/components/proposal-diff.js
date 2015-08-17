import Ember from 'ember';

export default Ember.Component.extend({
  seqs: Ember.computed.alias("proposal.changes.seqs"),
  meanings: Ember.computed.alias("proposal.changes.meanings"),
});
