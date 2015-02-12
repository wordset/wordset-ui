import Ember from 'ember';

export default Ember.ObjectController.extend({
  searchTerm: "",
  showSearchList: false,
  searchLoading: false,
  showMenu: false,
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
    return this.get("session").get("currentUser").get("isAdmin");
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
    }
  }
});
