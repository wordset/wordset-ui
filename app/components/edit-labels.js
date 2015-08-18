import Ember from "ember";

export default Ember.Component.extend({
  applicableLabels: Ember.computed("labels", function() {
    if (Ember.isEmpty(this.get("labels"))) { return []; }
    var _this = this;
    return this.get("labels").filter(function(label) {
      if((_this.get("forSeq") === true) && (label.get("forSeq") === false)) {
        return false;
      }
      if((_this.get("forMeaning") === true) && (label.get("forMeaning") === false)) {
        return false;
      }
      if(!Ember.isBlank(_this.get("forPos")) &&
         !(Ember.isEmpty(label.get("speechParts"))) &&
         !(label.get("speechParts").contains(_this.get("forPos")))) {
        return false;
      }
      return label;
    })
  }),
  parentDialects: Ember.computed("applicableLabels", function() {
    return this.get("applicableLabels").filterBy("isDialect", true).filterBy("parent", null);
  }),
  parentLabels: Ember.computed("applicableLabels", function() {
    return this.get("applicableLabels").filterBy("isDialect", false).filterBy("parent", null);
  }),
  actions: {
    startEdit() {
      this.set("isEditing", true);
    },
    collapse() {
      this.set("isEditing", false);
    }
  }
});
