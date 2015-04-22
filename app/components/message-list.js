import Ember from 'ember';
import ResizeMixin from 'ember-resize-mixin/main';

export default Ember.Component.extend(ResizeMixin, {
  tagName: "ul",
  classNames: "message-list",
  onResize: function() {
    console.log(this.get("hup.at"));
    // do what you want when resize is triggered
    var submitArea = Ember.$('.new-message-area');
    var elem = this.get("element");
    var area = Ember.$(elem);
    var topOffset = area.offset().top;
    var windowHeight = Ember.$(window).height();
    var size = windowHeight - topOffset - submitArea.height();
    area.css('height', size);
    elem.scrollTop = elem.scrollHeight;

  }.on('resize', 'didInsertElement').observes('hup.at'),
  scrollToBottom: function() {
    Ember.run.next(this, function() {
      this.get("element").scrollTop = this.get("element").scrollHeight;
    });
  }.observes("controller.@each")
});
