import Ember from 'ember';

export default Ember.Component.extend({
  tagName: "badge",
  classNameBindings: ["name", "value"],
  imagePath: Ember.computed("model.name", "model.level", function() {

  }),
  percentage: Ember.computed("badge.level", function() {
    var level = this.get("badge.level");
    if(Ember.isEmpty(level)) {
      return 100;
    }
    var percentage = Math.round(((level - 1) / 4) * 100);
    return percentage;
  }),
  inversePercentage: Ember.computed("percentage", function() {
    return 100-this.get("percentage");
  }),
  url: Ember.computed("activity.userId", function() {
    return "http://www.wordset.org/user/"+this.get("activity.userId");
  }),
  tweet: Ember.computed("badge.display_name", function() {
    var tweetText = "I just earned the " + this.get("badge.display_name") + " badge on @thewordset!";
    return encodeURI(tweetText);
  }),
});
