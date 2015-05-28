import Ember from 'ember';
import Base from 'ember-validations/validators/base';

export default Base.extend({
  call: function() {
    var prop = this.model.get(this.property);
    var backtick = "`";
    var endingPunctuation = [".", "?", "!"];

    if (Ember.isBlank(prop)) {
      this.errors.pushObject("We need something here!");
    } else if (prop[0] === prop[0].toUpperCase()) {
      this.errors.pushObject("Start your example sentence with a lowercase letter.");
    } else if (endingPunctuation.contains(prop[prop.length - 1])) {
      this.errors.pushObject("Don't finish your definition with punctuation.");
    } else if (!Ember.isBlank(prop) && prop.indexOf(backtick) !== -1){
      this.errors.pushObject("No need for backticks.");
    }
  }
});
