import Ember from 'ember';

export default Ember.Controller.extend({
  labels: Ember.computed("model.label_ids", function() {
    var _this = this;
    return this.store.filter('label', function(label) {
      return _this.get("label_ids").contains("" + label.id);
    });
  }),
  label_ids: Ember.computed("model.label_ids.@each", function() {
    return this.get("model.label_ids") || [];
  }),
  originalLabels: [],
});
