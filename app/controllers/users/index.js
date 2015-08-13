import Ember from 'ember';

export default Ember.Controller.extend({
  users: Ember.computed('model.[]', function() {
    return this.get("model").sortBy("points").reverse();
  })
});
