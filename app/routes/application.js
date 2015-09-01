import Ember from 'ember';
import ApplicationRouteMixin from 'simple-auth/mixins/application-route-mixin';
import ENV from '../config/environment';
/* global ga */

export default Ember.Route.extend(ApplicationRouteMixin).extend({
  notifier: Ember.inject.service(),
  meta: Ember.inject.service(),
  willTransitionAt: null,
  model() {
    return this.store.find('lang', "en");
  },
  setupController(controller, model) {
    controller.set("currentLang", model);
    controller.set("messages", this.store.findAll('message'));
    controller.set("activityNotifications", this.store.peekAll('notification'));
    this.get("meta");
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
      this.get("meta").reset();

      this.set("willTransitionAt", (new Date()).getTime());

      // This saves the previous transition for going back
      // to the user's original page when signing in
      // http://stackoverflow.com/questions/21122503/emberjs-return-to-current-route-after-logi
      this._saveTransition(transition);
    },
    didTransition() {
      this.hup.to();
      if (ENV.environment === 'production') {
        Ember.run(function() {
          ga('send', 'pageview', {
            'page': window.location.pathname,
            'title': document.title,
          });
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
            if(data.meta.isSkipped == true) {
              _this.get("notifier").show("You've voted on all proposals. Here's one you previously skipped.", {name: "Alert"});
            }
            _this.transitionTo('proposal', data.proposal.id);
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
