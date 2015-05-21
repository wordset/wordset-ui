import Ember from 'ember';

export default Ember.Component.extend({
  tagName: "badge",
  classNameBindings: ["name", "value"],
  imagePath: function() {

  }.property("model.name", "model.level")
});
