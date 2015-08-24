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
    if(!Ember.isBlank("meaning") && Ember.isBlank(this.get("meaning.pos"))) {
      this.set("meaning.pos", "noun")
    }
    if(this.get('meaning.action') === 'remove') {
      this.set('meaning.def', this.get('meaning.original.def'));
      this.set('meaning.example', this.get('meaning.original.example'));
      this.set('meaning.labels', this.get('meaning.original.labels') || []);
    }

    this.validate().then(function() {}, function() {});
  }.on("willInsertElement"),
  /* This is only required because ember-validations doesn't correctly observe child errors */
  hupHack: function() {
    this.hup.to();
    this.validate().then(function() {}, function() {});
  }.observes("meaning.example", "meaning.def", "meaning.action", "meaning.pos"),
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
