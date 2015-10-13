import Ember from "ember";
import ENV from "../../config/environment"

export default Ember.Route.extend({
  afterModel: function() {
    this.transitionTo("project.propose")
  }
})
