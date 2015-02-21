import Ember from 'ember';
import ResizeMixin from 'ember-resize-mixin/main';

export default Ember.View.extend(ResizeMixin, {
  tagName: "ul",
  classNames: "messageList",
  onResize: function() {
    // do what you want when resize is triggered
    var elem = this.get("element");
    var area = Ember.$(elem);
    var topOffset = area.offset().top;
    var windowHeight = Ember.$(window).height();
    var submitArea = Ember.$('.newMessageArea').height();
    var size = windowHeight - topOffset - submitArea;
    area.css('height', size);
    elem.scrollTop = elem.scrollHeight;
  }.on('resize', 'didInsertElement'),
  scrollToBottom: function() {
    Ember.run.next(this, function() {
      this.get("element").scrollTop = this.get("element").scrollHeight;
    })
  }.observes("controller.@each")
});
