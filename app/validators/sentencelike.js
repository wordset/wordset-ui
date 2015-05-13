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
    } else if (!endingPunctuation.contains(prop[prop.length - 1])) {
      this.errors.pushObject("Finish your example sentence with a full stop, question mark, or exclamation point.");
    }
  }
});
