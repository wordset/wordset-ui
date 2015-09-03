import Ember from "ember";

export default Ember.Component.extend({
  store: Ember.inject.service("store"),
  addedSynonyms: Ember.computed("newSynonyms.[]", "originalSynonyms.[]", function() {
    var _this = this;
    return this.get("newSynonyms").filter(function(item) {
      return !_this.get("originalSynonyms").contains(item);
    });
  }),

  removedSynonyms: Ember.computed("newSynonyms.[]", "originalSynonyms.[]", function() {
    var _this = this;
    return this.get("originalSynonyms").filter(function(item) {
      return !_this.get("newSynonyms").contains(item);
    });
  }),

  sameSynonyms: Ember.computed("newSynonyms.[]", "originalSynonyms.[]", function() {
    var _this = this;
    return this.get("newSynonyms").filter(function(item) {
      return _this.get("originalSynonyms").contains(item);
    });
  })
});
