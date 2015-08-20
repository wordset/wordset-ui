import Ember from 'ember';
import ApplicationRouteMixin from 'simple-auth/mixins/application-route-mixin';
import ENV from '../config/environment';
/* global ga */
/* global NREUM */

export default Ember.Route.extend(ApplicationRouteMixin).extend({
  notifier: Ember.inject.service(),
  willTransitionAt: null,
  model() {
    return this.store.find('lang', "en");
  },
  setupController(controller, model) {
    controller.set("currentLang", model);
    controller.set("messages", this.store.findAll('message'));
    controller.set("activityNotifications", this.store.peekAll('notification'));
    this._super(controller, model);
  },

  // This saves the previous transition for going back
  // to the user's original page when signing in
  // http://stackoverflow.com/questions/21122503/emberjs-return-to-current-route-after-login
  beforeModel(transition) {
    this._saveTransition(transition);
  },

  actions: {
    willTransition(transition) {
      // Set the page to a default title
      Ember.$(document).attr('title', 'Wordset – the Collaborative Dictionary');

      this.set("willTransitionAt", (new Date()).getTime());

      // This saves the previous transition for going back
      // to the user's original page when signing in
      // http://stackoverflow.com/questions/21122503/emberjs-return-to-current-route-after-logi
      this._saveTransition(transition);
    },
    didTransition() {
      this.hup.to();
      var _this = this;
      if (ENV.environment === 'production') {
        Ember.run(function() {
          ga('send', 'pageview', {
            'page': window.location.pathname,
            'title': document.title,
          });
          var transitionTime = (new Date()).getTime() - _this.get("willTransitionAt");
          //NREUM.inlineHit(window.location.pathname, 0, transitionTime, 0, 0, 0);
        });
      }
      this.controller.set("showMenu", false);
    },
    randomProposal(proposal_id) {
      var _this = this;
      this.intermediateTransitionTo('loading');
      if(this.get("controller.currentUser")) {
        var path = "/proposals/next";
        if(proposal_id) {
          path += "?proposal_id=" + proposal_id;
        }
        Ember.$.getJSON(ENV.api + path).then(function(data) {
          if(data.proposal !== undefined) {
            _this.store.pushPayload('proposal', data);
            _this.transitionTo('proposal.index', data.proposal.id);
          } else {
            _this.get("notifier").show("Yay! You voted on all open proposals!", {name: "Alert"});
            _this.transitionTo('proposals');
          }
        }, function() {});
      } else {
        _this.transitionTo('users.new');
      }
    },

    openModal(modalName, model) {
      return this.render(modalName, {
        into: 'application',
        outlet: 'modal',
        model: model,
      });
    },
    closeModal() {
      return this.disconnectOutlet({
        outlet: 'modal',
        parentView: 'application'
      });
    },
  },
  _saveTransition(transition) {
    if(transition.targetName !== ("users.login" || "users.new")) {
      this.controllerFor("users.login").set("previousTransition", transition);
    }
  }
});
