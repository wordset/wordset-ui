import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr("string"),
  description: DS.attr("string"),
  startAt: DS.attr("date"),
  percentageComplete: DS.attr("number"),
  totalTargetsCount: DS.attr("number"),
  fixedTargetsCount: DS.attr("number"),
  pendingTargetsCount: DS.attr("number"),

  percentageThrough: function() {
    var perc = this.get("percentageComplete")
    return "width: " + perc + "%;";
  }.property("percentageComplete"),

});
