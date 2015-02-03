import Ember from 'ember';

export default Ember.ObjectController.extend({
  def: function() {
    var delta = this.get("delta");
    if(delta.meanings) {
      return delta.meanings[0].def;
    } else {
      return delta.def;
    }
  }.property("delta.def", "delta.meanings.@each.def"),
  example: function() {
    var delta = this.get("delta");
    if(delta.meanings) {
      return delta.meanings[0].example;
    } else {
      return delta.example;
    }
  }.property("delta.example", "delta.meanings.@each.example"),
  previous: function() {
    this.get("model").get("proposal");
  }.property("model")
});
