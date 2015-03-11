import Ember from 'ember';
import ApplicationRouteMixin from 'simple-auth/mixins/application-route-mixin';
import ENV from '../config/environment';
import Proposal from '../models/proposal';
/* global ga */
/* global mixpanel */

export default Ember.Route.extend(ApplicationRouteMixin).extend({
  activate: function() {
    return this.store.find('word_list');
  },
  setupController: function(controller, model) {
    this._super(controller, model);
    this.controllerFor("panel.messages").set("model", this.store.find('message'));
    if(controller.get("username")) {
      var _this = this;
      var users = this.store.find("user", {user_id: controller.get("username")}).then(function(users) {
        _this.controllerFor("panel.scoreboard").set("list", users);
      }, function() { });

    }
    controller.set("activeProject", this.store.find("project", "current"));
  },

  actions: {
    willTransition: function() {
      Ember.$(document).attr('title', 'Wordset – the Collaborative Dictionary');
    },
    didTransition: function() {
      if (ENV.environment === 'production') {
        Ember.run(function() {
          ga('send', 'pageview', {
            'page': window.location.pathname,
            'title': document.title,
          });
        });
      }
      this.controllerFor("search").send("clear");
      this.controller.set("showMenu", false);
    },
    randomProposal: function(proposal_id) {
      var _this = this;
      this.intermediateTransitionTo('loading');
      Proposal.random(proposal_id).then(function(data) {
        if(data.proposal !== undefined) {
          _this.store.pushPayload("proposal", data);
          _this.transitionTo('proposal.index', data.proposal.id);
        } else {
          _this.flash.notice("YAY! You've voted on all open proposals!");
          _this.transitionTo('proposals');
        }
      }, function() {
        //_this.send("randomProposal")
      });
    },
    log: function(category, name) {
      var metaData = {"url": window.location.pathname, "user": this.get("session").get("username")};
      if(ENV.environment === "production") {
        Ember.run(function() {
          mixpanel.track(category + " " + name, metaData);
          ga('send', 'event', category, name);
        });
      } else {
        // console.log(name, metaData);
      }
    },
  }
});
