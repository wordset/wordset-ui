import Ember from 'ember';

export default Ember.Route.extend({
  seq: null,
  model(params) {
    this.set("seq", params.seq);
  },
  actions: {
    didTransition() {
      this.replaceWith("seq.wordset.index", "en", this.get("seq"));
    }
  }
});
