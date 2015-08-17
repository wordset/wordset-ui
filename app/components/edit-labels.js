import Ember from "ember";

export default Ember.Component.extend({
  parentDialects: Ember.computed("labels", function() {
    if (Ember.isEmpty(this.get("labels"))) { return []; }
    return this.get("labels").filterBy("isDialect", true).filterBy("parent", null);
  }),
  parentLabels: Ember.computed("labels", function() {
    if (Ember.isEmpty(this.get("labels"))) { return []; }
    return this.get("labels").filterBy("isDialect", false).filterBy("parent", null);
  }),
});
