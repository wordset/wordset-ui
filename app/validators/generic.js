import Base from 'ember-validations/validators/base';

export default Base.extend({
  call: function() {
    var prop = this.model.get(this.property);
    if (Ember.isBlank(prop)) {
      this.errors.pushObject("We need something here!");
    } else if (prop.length < 10) {
      this.errors.pushObject("It needs to be over 10 characters");
    } else if ((prop.indexOf("(") >= 0)||(prop.indexOf(")") >= 0)) {
      this.errors.pushObject("Please avoid parenthetical statements")
    }
  }
});
