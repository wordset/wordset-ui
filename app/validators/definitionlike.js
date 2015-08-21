import Ember from 'ember';
import Base from 'ember-validations/validators/base';

export function definitionlike(text, pos) {
  var backtick = "`";
  var endingPunctuation = [".", "?", "!"];

  if (Ember.isBlank(text)) {
    return "We need something here!";
  } else if ((pos === "verb") && (text.substr(0,3) !== "to ")) {
    return "Verb definitions should start with 'to'";
  } else if (text[0] === text[0].toUpperCase()) {
    return "Start your definition with a lowercase letter.";
  } else if (endingPunctuation.contains(text[text.length - 1])) {
    if (text.substr(text.length - 4) === "etc.") {
      // etc. is fine at the end of a definition
    }
    else {
      return "Don't finish your definition with punctuation.";
    }
  } else if (!Ember.isBlank(text) && text.indexOf(backtick) !== -1){
    return "No need for backticks.";
  }
  return false;
}

export default Base.extend({
  call() {
    var pos = (this.model.get("model.pos") || this.model.get("meaning.pos"));
    var text = this.model.get(this.property);
    var error = definitionlike(text, pos);
    if(error) {
      this.errors.pushObject(error);
    }
  },
});
