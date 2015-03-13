import Ember from 'ember';

export default Ember.Component.extend({
  searchTerm: "",
  showSearchList: false,
  searchLoading: false,
  selectedIndex: -1,
  wordList: null,
  selectedWord: function() {
    if(this.get("selectedIndex") >= 0) {
      return this.get("wordList.results").objectAt(this.get("selectedIndex"));
    } else {
      return null;
    }
  }.property("selectedIndex"),
  wordCount: function() {
    return this.get("wordList.results.length");
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
      this.get("targetObject.store").find('word_list', this.get('searchTerm'))
        .then(function(wordList) {
          _this.set("showSearchList", true);
          _this.set("searchLoading", false);
          _this.set("wordList", wordList);
        });
    }
  }.observes('searchTerm'),
  keyDown: function(event) {
    if(event.keyCode === 13) {
      if(event.shiftKey === true) {
        this.send("searchShiftEnter");
      } else {
        this.send("searchEnter");
      }
    } else if(event.keyCode === 40) { //downkey
      this.send("moveDown");
    } else if(event.keyCode === 38) { //upkey
      this.send("moveUp");
    } else if(event.keyCode === 27) { //escape
      this.send("clear");
    } else if(event.ctrlKey === true) {
      if(event.keyCode === 78) { // CTRL + n
        this.send("moveDown");
      } else if(event.keyCode === 80) { // CTRL + p
        this.send("moveUp");
      }
    } else {
      return true;
    }
    return false;
  },
  checkForFocus: function(event) {
    var _this = this;
    Ember.run.later(function() {
      if(!Ember.$.contains(_this.get("element"), document.activeElement)) {
        _this.set("showSearchList", false);
      };
    });
  }.on('focusOut'),
  actions: {
    clickWord: function(word) {
      this.set("showSearchList", false);
      if(word === null) {
        word = this.get("wordList.results").objectAt(0);
      }
      // It could be there are no words... so don't do anything.
      if(word) {
        this.get('targetObject').transitionToRoute("word", word);
      } else {
        this.get('targetObject').transitionToRoute("words.new");
      }
    },
    clear: function() {
      this.set("searchTerm", "");
      this.set("selectedIndex", -1);
      this.send("log", "search", "cleared");
    },
    searchEnter: function() {
      this.send("clickWord", this.get("selectedWord"))
    },
    searchShiftEnter: function() {
      this.get('targetObject').transitionToRoute("word", this.get("searchTerm"));
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
