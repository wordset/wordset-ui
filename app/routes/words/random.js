import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    return this.store.find("seq", {langs: this.modelFor("words").get("id")});
  },
  afterModel: function(seqs) {
    this.replaceWith("seq.wordset.index",
                      seqs.get("lastObject.lang.id"),
                      seqs.get("lastObject.text"));
  }
});
