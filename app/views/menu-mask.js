import Ember from 'ember';

export default Ember.View.extend({
  classNames: ['mask'],
  touchEnd: function() {
    this.get("controller").send("toggleMenu");
  },
  click: function() {
    this.get("controller").send("toggleMenu");
  }
});
