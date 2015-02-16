import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    return this.store.find("proposal", { random: true, limit: 1, needs_my_vote: true });
  },
  afterModel: function(proposals) {
    var proposal = proposals.get("lastObject");
    if(proposal) {
      this.transitionTo("proposal.index", proposal);
    } else {
      this.transitionTo("proposals");
      this.flash.success("You've voted on every open proposal. Great job!");
    }
  }
});
