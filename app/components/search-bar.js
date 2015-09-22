import Ember from 'ember';

export default Ember.Component.extend({
  lang: "en",
  search: Ember.inject.service(),
  searchTerm: "",
  showSearchList: false,
  searchLoading: false,
  selectedIndex: -1,
  loaded: false,
  wordList: null,
  didInsertElement() {
    // make sure we've loaded search
    var _this = this;
    this.get("search").load(this.get("lang")).then(function() {
      _this.set("loaded", true);
    });
  },
  selectedWord: Ember.computed("selectedIndex", function() {
    if(this.get("selectedIndex") >= 0) {
      return this.get("wordList").objectAt(this.get("selectedIndex"));
    } else {
      return null;
    }
  }),
  noExactWord: Ember.computed("wordList", function() {
    return this.get("wordList").indexOf(this.get("searchTerm").trim()) == -1;
  }),
  wordCount: Ember.computed("wordList", function() {
    return this.get("wordList.length");
  }),
  searchTermObserver: Ember.observer('searchTerm', function() {
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
  }),
  keyDown(event) {
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
      } else {
        return true;
      }
    } else {
      return true;
    }
    return false;
  },
  checkForFocus: Ember.on('focusOut', function() {
    var _this = this;
    Ember.run.later(function() {
      if(!Ember.$.contains(_this.get("element"), document.activeElement)) {
        _this.set("showSearchList", false);
      }
    }, 300);
  }),
  actions: {
    clickNewWord() {
      this.get('targetObject').transitionToRoute("words.new", "en");
      this.set("showSearchList", false);
      this.set('searchTerm', '');
    },
    clickWord(word) {
      this.set("showSearchList", false);
      if(word === null) {
        word = this.get("wordList").objectAt(0);
      }
      // It could be there are no words... so don't do anything.
      if(word) {
        this.get('targetObject').transitionToRoute("seq.wordset.index", "en", word);
        this.set('searchTerm', '');
      }
    },

    clear() {
      this.set("searchTerm", "");
      this.set("selectedIndex", -1);
    },
    searchEnter() {
      this.send("clickWord", this.get("selectedWord"));
    },
    searchShiftEnter() {
      this.get('targetObject').transitionToRoute("word", this.get("searchTerm"));
    },
    moveUp() {
      if(this.get("selectedIndex") > 0) {
        this.decrementProperty("selectedIndex");
      }
    },
    moveDown() {
      if(this.get("selectedIndex") < this.get("wordCount")) {
        this.incrementProperty("selectedIndex");
      }
    }
  },
});
