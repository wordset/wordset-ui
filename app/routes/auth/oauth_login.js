import Ember from 'ember';
import ENV from "../../config/environment";

export default Ember.Route.extend({
  model(params) {
    window.document.location = ENV.apiHost + "/auth/" + params.provider;
  }
});
