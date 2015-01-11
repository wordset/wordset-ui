import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    register: function() {
      var user = this.store.createRecord("user", {
        username: this.get("username"),
        password: this.get("password"),
        email: this.get("email")
      });
      user.save();
    }
  }
});
