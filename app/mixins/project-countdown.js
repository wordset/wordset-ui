import Ember from 'ember';

export default Ember.Mixin.create({
  timeRemaining: function() {
    return (this.get("project.endsAt") - (new Date())) / 1000;
  }.property("clock.second"),
  secondsRemaining: function() {
    return Math.floor(this.get("timeRemaining") % 60);
  }.property("timeRemaining"),
  minutesRemaining: function() {
    return Math.floor((this.get("timeRemaining") / 60) % 60);
  }.property("timeRemaining"),
  hoursRemaining: function() {
    return Math.floor((this.get("timeRemaining") / 3600) % 24);
  }.property("timeRemaining"),
  daysRemaining: function() {
    return Math.floor(this.get("timeRemaining") / 86400);
  }.property("timeRemaining"),
  expectedFixed: function() {
    var elapsedTime = ((new Date()) - this.get("project.startedAt")) / 1000;
    return Math.floor(elapsedTime / this.get("project.spaceBetweenProposals"));
  }.property("timeRemaining", "project.startedAt", "project.spaceBetweenProposals"),
  differenceFromExpected: function() {
    return this.get("project.fixedTargetsCount") - this.get("expectedFixed");
  }.property("expectedFixed", "project.fixedTargetsCount"),
  differenceIsNegative: function() {
    return this.get("differenceFromExpected") < 0 ;
  }.property("differenceFromExpected"),
  percentageExpectedFixed: function() {
    var number = ( this.get("expectedFixed") / this.get("project.totalTargetsCount") ) * 100;
    return "width: " + number + "%";
  }.property("expectedFixed", "project.totalTargetsCount"),
});
