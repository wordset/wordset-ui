import Ember from 'ember';
import Base from 'ember-validations/validators/base';

export default Base.extend({
  call: function() {
    var pos = (this.model.get("model.pos.pos") || this.model.get("model.meaning.pos"));
    var prop = this.model.get(this.property);
    var backtick = "`";
    var endingPunctuation = [".", "?", "!"];

    if (Ember.isBlank(prop)) {
      this.errors.pushObject("We need something here!");
    } else if ((pos === "verb") && (prop.substr(0,3) !== "to ")) {
      this.errors.pushObject("Verb definitions should start with 'to '");
    } else if (prop[0] === prop[0].toUpperCase()) {
      this.errors.pushObject("Start your definition with a lowercase letter.");
    } else if (endingPunctuation.contains(prop[prop.length - 1])) {
      if (prop.substr(prop.length - 4) === "etc.") {
        // etc. is fine at the end of a definition
      }
      else {
        this.errors.pushObject("Don't finish your definition with punctuation.");
      }
    } else if (!Ember.isBlank(prop) && prop.indexOf(backtick) !== -1){
      this.errors.pushObject("No need for backticks.");
    }
  }
});
