import Ember from "ember";
import config from "./config/environment";

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.resource("index", {path: "/"});
  this.resource("word", {path: "/word/:word_id"}, function() {
    this.route("proposals");
    this.route("new-meaning");

  });
  this.route("login");
  this.route("user", {}, function() {
    this.route("new");
    this.route("login");
    this.route("index", {path: "/:user_id"});
  });
  this.resource("words", function() {
    this.route("new");
  });
  this.resource("proposals");
  this.resource("proposal", {path: "/proposal/:proposal_id"}, function() {
    this.route("new-word");
    this.route("new-meaning");
    this.route("meaning-change");
  });

  this.resource("users");
  this.resource("faqs");
  this.resource("guidelines");

  //this.resource("submit-proposal");

});

export default Router;
