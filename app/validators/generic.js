import Ember from 'ember';
import Base from 'ember-validations/validators/base';

export default Base.extend({
  call() {
    var prop = this.model.get(this.property);
    if (Ember.isBlank(prop)) {
      // Blank ones are now fine
    } else if (prop.length < 10) {
      this.errors.pushObject("It needs to be over 10 characters");
    } else if ((prop.indexOf("(") >= 0)||(prop.indexOf(")") >= 0)) {
      this.errors.pushObject("Please avoid parenthetical statements");
    }
  }
});
