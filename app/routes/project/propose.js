import Ember from "ember";

export default Ember.Route.extend({
  setupController: function(controller, model) {
    this._super();
    var word = model.get("lastObject");
    var _this = this;
    this.store.find("meaning", this.get("meaningId")).then( function(meaning) {
      controller.set("meaning", meaning);
      controller.set("word", word);
      controller.set("model", _this.store.createRecord("proposal", {
        type: "MeaningChange",
        wordset: word,
        meaning: meaning,
        def: meaning.get("def"),
        example: meaning.get("example"),
        project: _this.modelFor("project"),
        reason: "Part of the " + _this.modelFor("project").get("name"),
      }));
    }, function() { });
  },
  model: function(params) {
    this.set("meaningId", params.meaning_id);
    return this.store.find("word", {meaning_id: params.meaning_id});
  }

});
