import Ember from 'ember';
import Base from 'ember-validations/validators/base';

export function sentencelike(prop) {
  var backtick = "`";
  var endingPunctuation = [".", "?", "!"];

  if (!Ember.isBlank(prop)) {
    if (prop[0] !== prop[0].toUpperCase()) {
      return "Start your example sentence with a capital letter.";
    } else if ( (prop[0] || prop[prop.length - 1]) === "\"") {
      return "There's no need to use quotation marks.";
    } else if (!Ember.isBlank(prop) && prop.indexOf(backtick) !== -1){
      return "No need for backticks.";
    } else {
      var hasPunctuation = endingPunctuation.contains(prop[prop.length - 1]);
      var hasPunctuationAndExtraSpace = endingPunctuation.contains(prop[prop.length - 2]) && prop[prop.length -1] === " ";
      if (hasPunctuationAndExtraSpace) {
        return "You have an extra space or you are trying to write two sentences.";
      } else if (!hasPunctuation) {
        return "Finish your example sentence with a full stop, question mark, or exclamation point.";
      }
    }
  }
  return false;
}

export default Base.extend({
  call() {
    var prop = this.model.get(this.property);
    var error = sentencelike(prop);
    if(error !== false) {
      this.errors.pushObject(error);
    }
  }
});
