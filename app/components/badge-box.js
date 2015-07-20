import Ember from 'ember';

export default Ember.Component.extend({
  tagName: "badge",
  classNameBindings: ["name", "value"],
  imagePath: function() {

  }.property("model.name", "model.level"),
  percentage: function() {
    var level = this.get("badge.level");
    if(Ember.isEmpty(level)) {
      return 100;
    }
    var percentage = Math.round(((level - 1) / 4) * 100);
    return percentage;
  }.property("badge.level"),
  inversePercentage: function() {
    return 100-this.get("percentage");
  }.property("percentage"),
  url: function() {
    return "http://www.wordset.org/user/"+this.get("activity.userId");
  }.property("activity.userId"),
  tweet: function() {
    var tweetText = "I just earned the " + this.get("badge.display_name") + " badge on @thewordset!";
    return encodeURI(tweetText);
  }.property("badge.display_name"),
});
