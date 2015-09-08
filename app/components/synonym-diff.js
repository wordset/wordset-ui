import Ember from "ember";

export default Ember.Component.extend({
  store: Ember.inject.service("store"),
  addedSynonyms: Ember.computed("meaning.synonyms.[]", "originalSynonyms.[]", function() {
    return this.get("meaning.synonyms").filter((item) => {
      return !this.get("originalSynonymIds").contains(item.meaning_id);
    });
  }),
  newSynonymIds: Ember.computed("meaning.synonyms.[]", function() {
    return this.get("meaning.synonyms").mapBy("meaning_id");
  }),
  originalSynonymIds: Ember.computed("originalSynonyms.[]", function() {
    return this.get("originalSynonyms").mapBy("meaning_id");
  }),

  removedSynonyms: Ember.computed("meaning.synonyms.[]", "originalSynonyms.[]", function() {
    return this.get("originalSynonyms").filter((item) => {
      return !this.get("newSynonymIds").contains(item.meaning_id);
    });
  }),

  sameSynonyms: Ember.computed("meaning.synonyms.[]", "originalSynonyms.[]", function() {
    return this.get("meaning.synonyms").filter((item) => {
      return this.get("originalSynonymIds").contains(item.meaning_id);
    });
  })
});
