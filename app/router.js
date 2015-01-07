import Ember from "ember";
import config from "./config/environment";

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.resource("index", {path: "/"});
  this.resource("word", {path: "/word/:word_id"}, function() {});
  this.resource("edit", {path: "/edit/:word_id"}, function() {});
  this.resource("sign-in");
  this.resource("sign-up");
});

export default Router;
