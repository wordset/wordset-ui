import Ember from 'ember';
import EmberValidations from 'ember-validations';
import ENV from '../../config/environment';

export default Ember.Controller.extend(EmberValidations.Mixin, {
  comment: "",
  validations: {
    comment: {
      presence: true,
      length: { minimum: 1 }
    },
  },
  actions: {
    submitComment: function() {
      if (this.get("isInvalid")) {
        return false;
      }
      var _this = this;
      var p = this.get("parentController").get("model");
      var comment = this.get("comment");

      Ember.$.post(ENV.api + "/activities", {
        activity: {
          proposal_id: p.get("id"),
          comment: comment
        },
      }).then(function() {
         _this.set("comment", "");
      }, function() { });
      this.send("log", "proposal", "commented");
    },
  }
});
