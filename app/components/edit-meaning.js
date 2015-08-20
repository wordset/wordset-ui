import Ember from 'ember';
import EmberValidations from 'ember-validations';

export default Ember.Component.extend( EmberValidations, {
  classNames: ["edit-meaning-inputs"],
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
  initialValidate: function() {
    this.validate().then(function() {}, function() {});
  }.on("willInsertElement"),
  /* This is only required because ember-validations doesn't correctly observe child errors */
  hupHack: function() {
    this.hup.to();
  }.observes("meaning.example", "meaning.def", "meaning.action"),
  actions: {
    remove() {
      if(this.get("meaning.action") === "add") {
        this.get("targetObject.changes.meanings").removeObject(this.get("meaning"));
        this.hup.to();
      } else {
        this.set("meaning.action", "remove");
      }
    },
    restore() {
      this.set("meaning.action", "modify");
    }
  },
});
