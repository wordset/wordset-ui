import Base from 'ember-validations/validators/base';

export default Base.extend({
  call: function() {
    var prop = this.model.get(this.property);

    var endingPunctuation = [".", "?", "!"]

    if (Ember.isBlank(prop)) {
      this.errors.pushObject("We need something here!");
    } else if (prop[0] !== prop[0].toUpperCase()) {
      this.errors.pushObject("Start your example sentence with a capital letter.");
    } else if ( (prop[0] || prop[prop.length - 1]) == "\"") {
      this.errors.pushObject("There's no need to use quotation marks.");
    } else {
      var hasPunctuation = endingPunctuation.contains(prop[prop.length - 1]);
      var hasPunctuationAndExtraSpace = endingPunctuation.contains(prop[prop.length - 2]) && prop[prop.length -1] === " ";
      if (hasPunctuationAndExtraSpace) {
        this.errors.pushObject("You have an extra space or you are trying to write two sentences.")
      } else if (!hasPunctuation) {
        this.errors.pushObject("Finish your example sentence with a full stop, question mark, or exclamation point.");
      }
    }
  }
});
