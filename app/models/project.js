import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr("string"),
  description: DS.attr("string"),
  longDescription: DS.attr("string"),
  rules: DS.attr("string"),
  state: DS.attr("string"),
  percentageComplete: DS.attr("number"),
  totalTargetsCount: DS.attr("number"),
  fixedTargetsCount: DS.attr("number"),
  pendingTargetsCount: DS.attr("number"),
  startedAt: DS.attr("date"),
  endsAt: DS.attr("date"),
  expectedFixed: DS.attr("number"),

  percentageThrough: function() {
    var perc = this.get("percentageComplete");
    return "width: " + perc + "%;";
  }.property("percentageComplete"),

  calculateExpectedFixed: function() {
    if(this.get("hasTimer")) {
      var elapsedTime = (new Date()) - this.get("startedAt");
      this.set("expectedFixed", elapsedTime / this.get("spaceBetweenProposals"));
    } else {
      this.set("expectedFixed", 0);
    }
  }.on("didLoad", "hup.at"),

  canHelpOut: function() {
    return (this.get("totalTargetsCount") > (this.get("pendingTargetsCount") + this.get("fixedTargetsCount")));
  }.property("totalTargetsCount", "pendingTargetsCount", "fixedTargetsCount"),

  hasTimer: function() {
    return !!((this.get("state") === "active") && this.get("endsAt"));
  }.property("endsAt", "state"),
  totalTimeRemaining: function() {
    return this.get("endsAt") - this.get("startedAt");
  }.property("endsAt", "startedAt", "hup.at"),
  spaceBetweenProposals: function() {
    return this.get("totalTime") / this.get("totalTargetsCount");
  }.property("hasTimer", "totalTime", "totalTargetsCount"),
});
