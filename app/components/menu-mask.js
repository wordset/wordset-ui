import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['mask'],
  touchEnd() {
    this.get("targetObject").send("toggleMenu");
  },
  click() {
    this.get("targetObject").send("toggleMenu");
  }
});
