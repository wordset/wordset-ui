import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    return this.store.find("seq", {langs: "en"});
  },
  afterModel: function(seqs) {
    console.log(seqs.get("lastObject.lang.id"));
    console.log(seqs.get("lastObject.text"));
    this.replaceWith("seq.wordset.index",
                      seqs.get("lastObject.lang.id"),
                      seqs.get("lastObject.text"));
  }
});
