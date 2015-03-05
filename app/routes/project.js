import Ember from 'ember';
import ENV from '../config/environment';

export default Ember.Route.extend({
  actions: {
    randomTarget: function() {
      var _this = this
      var path = "/projects/" + this.controller.get("model.id") + "/next";
      Ember.$.getJSON(ENV.api + path).then(
        function(data) {
          _this.store.pushPayload("meaning", data);
          _this.transitionTo("project.propose", data.meaning.id);
        }, function() { }
      );
    },
  }
});
