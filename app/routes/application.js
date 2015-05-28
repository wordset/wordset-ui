import Ember from 'ember';
import ApplicationRouteMixin from 'simple-auth/mixins/application-route-mixin';
import ENV from '../config/environment';
import Proposal from '../models/proposal';
/* global ga */
/* global NREUM */

export default Ember.Route.extend(ApplicationRouteMixin).extend({
  notifier: Ember.inject.service(),
  willTransitionAt: null,
  activate: function() {
    this.store.find('lang');
  },
  setupController: function(controller, model) {
    this._super(controller, model);
    this.controllerFor("panel.messages").set("model", this.store.find('message'));
    controller.set("activeProject", this.store.find("project", "current"));
  },

  // This saves the previous transition for going back
  // to the user's original page when signing in
  // http://stackoverflow.com/questions/21122503/emberjs-return-to-current-route-after-login
  beforeModel: function(transition) {
    this._saveTransition(transition);
  },

  actions: {
    willTransition: function(transition) {
      // Set the page to a default title
      Ember.$(document).attr('title', 'Wordset – the Collaborative Dictionary');

      this.set("willTransitionAt", (new Date()).getTime());

      // This saves the previous transition for going back
      // to the user's original page when signing in
      // http://stackoverflow.com/questions/21122503/emberjs-return-to-current-route-after-logi
      this._saveTransition(transition);
    },
    didTransition: function() {
      this.hup.to();
      var _this = this;
      if (ENV.environment === 'production') {
        Ember.run(function() {
          ga('send', 'pageview', {
            'page': window.location.pathname,
            'title': document.title,
          });
          var transitionTime = (new Date()).getTime() - _this.get("willTransitionAt");
          NREUM.inlineHit(window.location.pathname, 0, transitionTime, 0, 0, 0);
        });
      }
      //this.controllerFor("search").send("clear");
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
          _this.get("notifier").show("Yay! You voted on all open proposals!", {name: "Alert"});
          _this.transitionTo('proposals');
        }
      }, function() {
        //_this.send("randomProposal")
      });
    },
    log: function(category, name) {
      if(ENV.environment === "production") {
        Ember.run(function() {
          ga('send', 'event', category, name);
        });
      }
    },
    openModal: function(modalName, model) {
      return this.render(modalName, {
        into: 'application',
        outlet: 'modal',
        model: model,
      });
    },
    closeModal: function() {
      return this.disconnectOutlet({
        outlet: 'modal',
        parentView: 'application'
      });
    },
  },
  _saveTransition: function(transition) {
    if(transition.targetName !== ("users.login" || "users.new")) {
      this.controllerFor("users.login").set("previousTransition", transition);
    }
  }
});
