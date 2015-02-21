import Ember from 'ember';
import ENV from '../config/environment';
/* global mixpanel */

export default Ember.ObjectController.extend({
  searchTerm: "",
  showSearchList: false,
  searchLoading: false,
  showMenu: false,
  showChat: false,
  wordList: null,
  searchTermObserver: function() {
    if(this.get("searchTerm") === "") {
      this.set("showSearchList", false);
      this.set("searchLoading", false);
      this.set("wordList", null);
    } else {
      this.set("searchLoading", true);
      var _this = this;
      this.store.find('word_list', this.get('searchTerm'))
        .then(function(wordList) {
          _this.set("showSearchList", true);
          _this.set("searchLoading", false);
          _this.set("wordList", wordList);
        });
    }
  }.observes('searchTerm'),
  isAdmin: function() {
    return this.get("currentUser").get("isAdmin");
  }.property("currentUser"),
  currentUser: function() {
    return this.get("session").get("currentUser");
  }.property("session.currentUser"),
  actions: {
    clickWordFromList: function(word) {
      this.set("showSearchList", false);
      this.transitionToRoute("word", word);
    },
    clear: function() {
      this.set("searchTerm", "");
    },
    toggleMenu: function() {
      this.toggleProperty("showMenu");
    },
    toggleChat: function() {
      this.toggleProperty("showChat");
    },
    log: function(name) {
      var metaData = {"url": window.location.pathname, "user": this.get("currentUser").get("id")};
      if(ENV.environment === "production") {
        mixpanel.track(name, metaData);
      } else {
        console.log(name, metaData);
      }
    }
  }
});
