import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

export default Router.map(function() {
  this.route("index", {
    path: "/",
    resetNamespace: true
  });
  this.route("redirector");

  this.route("login");
  this.route("user", {path: "/user/:user_id"}, function() {
    this.route("activity");
    this.route("proposals");
  });

  this.route("auth", function() {
    this.route("setup", {path: "/:provider/setup/:token"});
    this.route("oauth_login", {path: "/:provider/login"});
    this.route("manual", {path: "/do/:username/:auth_key"});
  });

  this.route("users", {}, function() {
    this.route("index");
    this.route("forgot-password");
    this.route("reset-password");
    this.route("new");
    this.route("login");
  });
  this.route("words", {
    path: "/words/:lang",
    resetNamespace: true
  }, function() {
    this.route("index");
    this.route("new");
    this.route("random");
  });
  this.route("posts", {
    resetNamespace: true
  });
  this.route("post", {
    path: "/post/:post_id",
    resetNamespace: true
  });
  this.route("proposals", {
    resetNamespace: true
  }, function() {
  });
  this.route("proposal", {
    path: "/proposal/:proposal_id",
    resetNamespace: true
  });
  this.route("projects");
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

  this.route('legacy-word', {path: "/word/:seq"});

  this.route("quizzes");
  this.route("quiz", {path: "/quiz/:id"});

  this.route("seq", {
    path: "/:lang/:seq",
    resetNamespace: true
  }, function() {
    this.route("wordset", {path: "/"}, function() {
      this.route("proposals");
    });
  });

  this.route('not-found', { path: '/*path' });

});
