import Ember from 'ember';

export default Ember.Component.extend({
  tagName: "li",
  attributeBindings: "name",
  classNameBindings: ['selected'],
  selected: function() {
    return this.get("selectedWord") === this.get("word");
  }.property("selectedWord", "word"),
});
