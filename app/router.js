import Ember from "ember";
import config from "./config/environment";

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.resource("index", {path: "/"});
  this.resource("word", {path: "/word/:word_id"}, function() {
    this.resource("suggestion", function() {
      this.route("new");
    });
  });
  this.route("login");
  this.resource("user", function() {
    this.route("new");
    this.route("login");
  });
  this.resource("suggestions");
  this.resource("submit-suggestion");

});

export default Router;
