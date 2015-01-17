import Ember from 'ember';

export default Ember.TextArea.extend({
  didInsertElement: function() {
    var area = Ember.$('#'+this.get('elementId'));
    area.autosize();
  }
});
