import Ember from 'ember';
import ResizeMixin from 'ember-resize-mixin/main';

export default Ember.View.extend(ResizeMixin, {
  classNames: ['mask'],
  touchEnd: function() {
    this.get("controller").send("toggleMenu");
  },
  click: function() {
    this.get("controller").send("toggleMenu");
  }
});
