import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr("string"),
  description: DS.attr("string"),
  startAt: DS.attr("date"),
  percentageComplete: DS.attr("number"),
  totalTargets: DS.attr("number"),
  fixedTargets: DS.attr("number"),
  pendingTargets: DS.attr("number"),

  percentageThrough: function() {
    var perc = this.get("percentageComplete")
    return "width: " + perc + "%;";
  }.property("percentageComplete"),

});
