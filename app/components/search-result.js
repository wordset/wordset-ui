import Ember from 'ember';

export default Ember.Component.extend({
  tagName: "li",
  classNameBindings: ['selected'],
  selected: function() {
    console.log("checking selected", this.get('selectedWord'))
    return this.get("selectedWord") === this.get("word");
  }.property("selectedWord", "word"),
});
