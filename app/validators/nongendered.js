import Ember from 'ember';
import Base from 'ember-validations/validators/base';

export default Base.extend({
  call: function() {
    var prop = this.model.get(this.property);
    var genderedWords = ["her", "his", "he", "she", "him", "hers", "herself", "himself", "man", "woman", "girl", "boy"];
    if (Ember.isBlank(prop)) {
      this.errors.pushObject("We need something here!");
    } else {
      var downProp = prop.toLowerCase();
      var tokens = downProp.split(/[^\w]+/);
      var word = this.model.get("wordset.name");
      if (tokens.any(function(token) {
        if(token !== word) {
          return genderedWords.contains(token);
        }
      })) {
        this.errors.pushObject("Try not to use gendered terms. We, they, I and you work just as well!");
      }
    }
  }
});
