import Ember from 'ember';

export default Ember.Controller.extend({
  labels: function() {
    var _this = this;
    return this.store.filter("label", function(label) {
      return _this.get("label_ids").contains("" + label.id);
    })
  }.property("model.label_ids"),
  label_ids: function() {
    return this.get("model.label_ids") || [];
  }.property("model.label_ids.@each"),
  originalLabels: [],
});
