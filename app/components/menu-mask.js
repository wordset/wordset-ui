import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['mask'],
  touchEnd: function() {
    this.get("targetObject").send("toggleMenu");
  },
  click: function() {
    this.get("targetObject").send("toggleMenu");
  }
});
