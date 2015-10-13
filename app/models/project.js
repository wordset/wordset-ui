import Ember from 'ember';
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

  lang: DS.belongsTo('lang', {
    async: false,
    inverse: 'projects'
  }),

  percentageThrough: Ember.computed("percentageComplete", function() {
    var perc = this.get("percentageComplete");
    return "width: " + perc + "%;";
  }),

  canHelpOut: Ember.computed(
    "totalTargetsCount",
    "pendingTargetsCount",
    "fixedTargetsCount",
    function() {
      return (this.get("totalTargetsCount") > (this.get("pendingTargetsCount") + this.get("fixedTargetsCount")));
    }
  ),


  hasTimer: Ember.computed("endsAt", "state", function() {
    return !!((this.get("state") === "active") && this.get("endsAt"));
  }),
  totalTimeRemaining: Ember.computed("endsAt", "startedAt", "hup.at", function() {
    return this.get("endsAt") - this.get("startedAt");
  }),
  spaceBetweenProposals: Ember.computed("hasTimer", "endsAt", "startedAt", "totalTargetsCount", function() {
    return ((this.get("endsAt") - this.get("startedAt")) / 1000) / this.get("totalTargetsCount");
  }),
});
