import Ember from 'ember';
import EmberValidations from 'ember-validations';

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
      var _this = this;
      var p = this.get("parentController").get("model");
      var comment = this.get("comment");
      var a = this.store.createRecord("activity", {
        proposalId: p.get("id"),
        comment: comment,
        type: "Comment",
      });
      this.send("log", "proposal", "commented");
      a.save().then( function() {
        _this.set("comment", "");
      },
      function() {

      });
    }
  }
});
