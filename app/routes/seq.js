import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
    return this.store.find('seq', params.lang + "-" + params.seq).then(
      (model) => model,
      (error) => null);
  },
  afterModel: function(model) {
    this._super(model);
    if(Ember.isEmpty(model)) {
      this.notifier.error("No such word found!");
      this.transitionTo("application");
    } else {
      this.send("log", "word", "viewed");
      Ember.$(document).attr('title', 'What does \"' + model.get("text") + '\" mean?');
    }

  },
});
