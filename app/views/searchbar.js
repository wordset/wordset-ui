import Ember from 'ember';

export default Ember.View.extend({
  classNames: ['searchbar'],
  keyDown: function(event) {
    var controller = this.get('controller');
    if(event.keyCode === 13) {
      if(event.shiftKey === true) {
        controller.send("searchShiftEnter");
      } else {
        controller.send("searchEnter");
      }
    } else if(event.keyCode === 40) { //downkey
      controller.send("moveDown");
    } else if(event.keyCode === 38) { //upkey
      controller.send("moveUp");
    } else if(event.keyCode === 27) { //escape
      controller.send("clear");
    }
  }
});
