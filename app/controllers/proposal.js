import Ember from 'ember';

export default Ember.ObjectController.extend({
  previous: function() {
    this.get("model").get("proposal");
  }.property("model")
});
