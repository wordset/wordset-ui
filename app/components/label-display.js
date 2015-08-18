import Ember from "ember";

export default Ember.Component.extend({
  store: Ember.inject.service("store"),
  labelList: Ember.computed('labelIds.[]', 'labels.[]', function() {
    return this.get("labels") || this.get("labelIds").map((id) => this.get("store").peekRecord('label', id));
  }),
});
