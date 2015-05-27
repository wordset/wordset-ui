import Ember from 'ember';

export default Ember.Component.extend({
  willInsertElement: function() {
    var _this = this;
    this.get("targetObject.store").find("post").then( function(post) {
      controller.set("model", post);
    }, function(){} );
  },
});
