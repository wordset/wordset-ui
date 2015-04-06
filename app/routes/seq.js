import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
    return this.store.find('seq', params.lang + "-" + params.seq);
  },
  afterModel: function(model) {
    this._super(model);
    this.send("log", "word", "viewed");
    Ember.$(document).attr('title', 'What does \"' + this.get("model.text") + '\" mean?');
  },
});
