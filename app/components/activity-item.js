import Ember from 'ember';
import ENV from '../config/environment';

export default Ember.Component.extend({
  tagName: "activity",
  classNameBindings: ['activity.action', 'activity.finalState', 'isYae:yae'],
  isYae: Ember.computed("activity.voteValue", function() {
    return (this.get("activity.voteValue") > 0);
  }),
  click: function() {
    if(this.get("activity.notification.id")) {
      Ember.$.post(ENV.api + "/notifications/" + this.get("activity.notification.id") + "/ack");
    }
    var router = this.container.lookup("router:main");
    if(Ember.isBlank(this.get("activity.proposalId"))) {
      router.transitionTo("user", this.get("activity.userId"));
    } else {
      router.transitionTo("proposal", this.get("activity.proposalId"));
    }
  },
});
