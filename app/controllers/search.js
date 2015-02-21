import Ember from 'ember';

export default Ember.Controller.extend({
  searchTerm: "",
  showSearchList: false,
  searchLoading: false,
  selectedIndex: -1,
  selectedWord: function() {
    if(this.get("selectedIndex") >= 0) {
      return this.get("wordList.results").objectAt(this.get("selectedIndex"));
    } else {
      return null;
    }
  }.property("selectedIndex"),
  wordCount: function() {
    return this.get("wordList.results").length;
  }.property("wordList"),
  searchTermObserver: function() {
    this.set("selectedIndex", -1);
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
  actions: {
    clickWordFromList: function(word) {
      this.set("showSearchList", false);
      this.transitionToRoute("word", word);
    },
    clear: function() {
      this.set("searchTerm", "");
      this.set("selectedIndex", -1);
    },
    searchEnter: function() {
      var word = this.get("selectedWord");
      if(word === null) {
        word = this.get("wordList").get("results").objectAt(0);
      }
      // It could be there are no words... so don't do anything.
      if(word) {
        this.transitionToRoute("word", word);
      }
    },
    searchShiftEnter: function() {
      this.transitionToRoute("word", this.get("searchTerm"));
    },
    moveUp: function() {
      if(this.get("selectedIndex") > 0) {
        this.decrementProperty("selectedIndex");
      }
    },
    moveDown: function() {
      if(this.get("selectedIndex") < this.get("wordCount")) {
        this.incrementProperty("selectedIndex");
      }
    }
  },
});
