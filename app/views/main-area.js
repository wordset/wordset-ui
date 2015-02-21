import Ember from 'ember';
import ResizeMixin from 'ember-resize-mixin/main';

export default Ember.View.extend(ResizeMixin, {
  classNames: ['mainArea'],
  onResize: function() {
    // do what you want when resize is triggered
    var area = Ember.$('.mainArea');
    var topOffset = area.offset().top;
    var windowHeight = Ember.$(window).height();
    var size = windowHeight - topOffset;
    console.log(size)
    area.css('height', size);
  }.on('resize', 'didInsertElement'),
});
