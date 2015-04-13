import Ember from 'ember';

export default Ember.Route.extend({
  seq: null,
  model: function(params) {
    this.set("seq", params.seq);
  },
  actions: {
    didTransition: function() {
      this.replaceWith("seq.wordset.index", "en", this.get("seq"));
    }
  }
});
