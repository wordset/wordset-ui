import Ember from 'ember';

export default Ember.Component.extend({
  tagName: "badge",
  classNameBindings: ["name", "value"],
  imagePath: function() {

  }.property("model.name", "model.level"),
  percentage: function() {
    var level = this.get("badge.level");
    if(Ember.isEmpty(level)) {
      return "100";
    }
    var percentage = Math.round(((level - 1) / 4) * 100);
    return `${percentage}`
  }.property("badge.level")
});
