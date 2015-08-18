import Ember from 'ember';
import EmberValidations from 'ember-validations';

export default Ember.Component.extend( EmberValidations, {
  posList: Ember.computed("lang", function() {
    return this.get("lang.parts");
  }),
  validations: {
    "meaning.def": {
      generic: true,
      definitionlike: true,
    },
    "meaning.example": {
      generic: true,
      nongendered: true,
      sentencelike: true,
    },
  },
  actions: {
    remove() {
      if(this.get("meaning.action") === "add") {
        this.get("targetObject.changes.meanings").removeObject(this.get("meaning"));
      } else {
        this.set("meaning.action", "remove");
      }
    },
    restore() {
      this.set("meaning.action", "change");
    }
  }
});
