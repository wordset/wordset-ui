import Ember from "ember";
import config from "./config/environment";

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.resource("word", {path: "/word/:word_id"}, function() {});
});

export default Router;
