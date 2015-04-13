import Ember from "ember";
import config from "./config/environment";

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.resource("index", {path: "/"});

  this.route("login");
  this.route("user", {path: "/user/:user_id"}, function() {
    this.route("activity");
  });
  this.route("users", {}, function() {
    this.route("index");
    this.route("forgot-password");
    this.route("reset-password");
    this.route("new");
    this.route("login");
  });
  this.resource("words", function() {
    this.route("new");
    this.route("random");
  });
  this.resource("post", {path: "/post/:post_id"});
  this.resource("proposals", function() {
  });
  this.resource("proposal", {path: "/proposal/:proposal_id"}, function() {
    this.route("new-word");
    this.route("new-meaning");
    this.route("meaning-change");
  });
  this.route("project", {path: "/project/:project_id"}, function() {
    this.route("random");
    this.route("propose", {path: "/propose/:meaning_id"});
  });
  this.route("info", function() {
    this.route("goals");
    this.route("faqs");
    this.route("guidelines");
    this.route("get-started");
    this.route("legal");
  });

  this.resource("seq", {path: "/:lang/:seq"}, function() {
    this.route("wordset", {path: "/"}, function() {
      this.route("proposals");
      this.route("new-meaning");
    });
  });
  this.route('legacy-word');
});

export default Router;
