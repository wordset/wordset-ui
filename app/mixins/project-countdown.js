import Ember from 'ember';

export default Ember.Mixin.create({
  timeRemaining: Ember.computed("clock.second", function() {
    return (this.get("project.endsAt") - (new Date())) / 1000;
  }),
  secondsRemaining: Ember.computed("timeRemaining", function() {
    return Math.floor(this.get("timeRemaining") % 60);
  }),
  minutesRemaining: Ember.computed("timeRemaining", function() {
    return Math.floor((this.get("timeRemaining") / 60) % 60);
  }),
  hoursRemaining: Ember.computed("timeRemaining", function() {
    return Math.floor((this.get("timeRemaining") / 3600) % 24);
  }),
  daysRemaining: Ember.computed("timeRemaining", function() {
    return Math.floor(this.get("timeRemaining") / 86400);
  }),
  lessThanOneDay: Ember.computed("daysRemaining", function() {
    return this.get("daysRemaining") < 1;
  }),
  expectedFixed: Ember.computed(
    "timeRemaining",
    "project.startedAt",
    "project.spaceBetweenProposals",
    function() {
      var elapsedTime = ((new Date()) - this.get("project.startedAt")) / 1000;
      return Math.floor(elapsedTime / this.get("project.spaceBetweenProposals"));
    }
  ),
  differenceFromExpected: Ember.computed("expectedFixed", "project.fixedTargetsCount", function() {
    return this.get("project.fixedTargetsCount") - this.get("expectedFixed");
  }),
  differenceIsNegative: Ember.computed("differenceFromExpected", function() {
    return this.get("differenceFromExpected") < 0 ;
  }),
  percentageExpectedFixed: Ember.computed("expectedFixed", "project.totalTargetsCount", function() {
    var number = ( this.get("expectedFixed") / this.get("project.totalTargetsCount") ) * 100;
    return "width: " + number + "%";
  }),
});
