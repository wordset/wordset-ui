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
      a.save().then( function(comment) {
        _this.set("comment", "");
        p.get("activities").addObject(comment);
      },
      function() {

      });
    }
  }
});
