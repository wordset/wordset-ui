import Ember from 'ember';
import Base from 'ember-validations/validators/base';

export function generic(prop) {
  if (Ember.isBlank(prop)) {
    // Blank ones are now fine
  } else if (prop.length < 10) {
    return "It needs to be over 10 characters";
  } else if ((prop.indexOf("(") >= 0)||(prop.indexOf(")") >= 0)) {
    return "Please avoid parenthetical statements";
  }
  return false;
}

export default Base.extend({
  call() {
    var prop = this.model.get(this.property);
    var error = generic(prop);
    if(error !== false) {
      this.errors.pushObject(error);
    }
  }
});
