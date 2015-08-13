import Ember from 'ember';

export default Ember.Component.extend({
  tagName: "li",
  attributeBindings: "name",
  classNameBindings: ['selected'],
  selected: Ember.computed("selectedWord", "word", function() {
    return this.get("selectedWord") === this.get("word");
  }),
});
