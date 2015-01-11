import Ember from 'ember';

export default Ember.ObjectController.extend({
  actions: {
    register: function() {
      var _this = this;
      this.get("model").save().then(function(){
        _this.flash.success('Welcome! Now just log in to begin!');
        _this.transitionToRoute('user.login');
      }, function(errors) {
        // Couldn't save, do nothing about it.
        _this.set("isError", true);
        _this.flash.notice('Oops! Looks like something was amiss.');
        console.log(errors);
      });
    }
  }
});
