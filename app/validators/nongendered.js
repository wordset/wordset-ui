import Base from 'ember-validations/validators/base';

export default Base.extend({
  call: function() {
    var prop = this.model.get(this.property);
    var genderedWords = ["her", "his", "he", "she"]
    if (Ember.isBlank(prop)) {
      this.errors.pushObject("We need something here!");
    } else {
      var downProp = prop.toLowerCase();
      var tokens = downProp.split(/[^\w]+/);
      if (tokens.any(function(token) {
        return genderedWords.contains(token);
      })) {
        this.errors.pushObject("Try not to use gendered terms. We, they, I and you work just as well!");
      }
    }
  }
});
