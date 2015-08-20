import Ember from "ember";

export default Ember.Route.extend({
  setupController(controller, model) {
    this._super(controller, model);
    var wordset = model.get("lastObject");
    var _this = this;
    this.store.find('meaning', this.get("meaningId")).then( function(meaning) {
      controller.set("meaning", meaning);
      controller.set("wordset", wordset);
      controller.set("model", _this.store.createRecord('proposal', {
        type: "MeaningChange",
        wordset: wordset,
        meaning: meaning,
        def: meaning.get("def"),
        example: meaning.get("example"),
        project: _this.modelFor("project"),
        reason: "Part of the " + _this.modelFor("project").get("name"),
        labelIds: meaning.get("labels"),
        lang: wordset.get("lang"),
      }));
    }, function() { });
  },
  model(params) {
    this.set("meaningId", params.meaning_id);
    return this.store.find('wordset', {meaning_id: params.meaning_id});
  },

});
