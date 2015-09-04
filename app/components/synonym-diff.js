import Ember from "ember";

export default Ember.Component.extend({
  store: Ember.inject.service("store"),
  addedSynonyms: Ember.computed("newSynonyms.[]", "originalSynonyms.[]", function() {
    return this.get("newSynonyms").filter((item) => {
      return !this.get("originalSynonyms").contains(item);
    });
  }),
  newSynonymIds: Ember.computed("newSynonyms.[]", function() {
    return this.get("newSynonyms").mapBy("meaning_id");
  }),
  originalSynonymIds: Ember.computed("originalSynonyms.[]", function() {
    return this.get("originalSynonym").mapBy("meaning_id");
  }),

  removedSynonyms: Ember.computed("newSynonyms.[]", "originalSynonyms.[]", function() {
    return this.get("originalSynonyms").filter((item) => {
      return !this.get("newSynonymIds").contains(item.meaning_id);
    });
  }),

  sameSynonyms: Ember.computed("newSynonyms.[]", "originalSynonyms.[]", function() {
    return this.get("newSynonyms").filter((item) => {
      return this.get("originalSynonyms").contains(item.meaning_id);
    });
  })
});
