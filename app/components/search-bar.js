import Ember from 'ember';

export default Ember.Component.extend({
  needs: ['service:search'],
  lang: "en",
  search: Ember.inject.service(),
  searchTerm: "",
  showSearchList: false,
  searchLoading: false,
  selectedIndex: -1,
  loaded: false,
  wordList: null,
  didInsertElement: function() {
    // make sure we've loaded search
    var _this = this;
    this.get("search").load(this.get("lang")).then(function() {
      _this.set("loaded", true);
    });
  },
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
      var _this = this;
      this.get("search").perform(this.get("lang"), this.get('searchTerm')).then(function(list) {
        _this.set("wordList", list);
        _this.set("showSearchList", true);
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
  checkForFocus: function() {
    var _this = this;
    Ember.run.later(function() {
      if(!Ember.$.contains(_this.get("element"), document.activeElement)) {
        _this.set("showSearchList", false);
      }
    }, 300);
  }.on('focusOut'),
  actions: {
    clickNewWord: function() {
      this.get('targetObject').transitionToRoute("words.new", "en");
      this.set("showSearchList", false);
      this.set('searchTerm', '');
    },
    clickWord: function(word) {
      this.set("showSearchList", false);
      if(word === null) {
        word = this.get("wordList.results").objectAt(0);
      }
      // It could be there are no words... so don't do anything.
      if(word) {
        this.get('targetObject').transitionToRoute("seq.wordset.index", "en", word);
        this.set('searchTerm', '');
      }
    },

    clear: function() {
      this.set("searchTerm", "");
      this.set("selectedIndex", -1);
    },
    searchEnter: function() {
      this.send("clickWord", this.get("selectedWord"));
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
