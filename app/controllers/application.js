import Ember from 'ember';

export default Ember.ObjectController.extend({
  searchTerm: "",
  showSearchList: false,
  wordList: null,
  searchTermObserver: function() {
    if(this.get("searchTerm") === "") {
      this.set("showSearchList", false);
      this.set("wordList", null);
    } else {
      this.set("wordList", this.store.find('word_list', this.get('searchTerm')));
      this.set("showSearchList", true);
    }
  }.observes('searchTerm'),
  actions: {
    clickWordFromList: function(word) {
      this.set("showSearchList", false);
      this.transitionToRoute("word", word);
    },
    clear: function() {
      var input = document.getElementById("searchForWord");
      input.value = '';
      input.focus();
    }
  }
});
