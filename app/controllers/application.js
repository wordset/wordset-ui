import Ember from 'ember';

export default Ember.ArrayController.extend({
  searchTerm: "",
  showSearchList: false,
  searchTermObserver: function() {
    if(this.get("searchTerm") === "") {
      this.set("showSearchList", false);
    } else {
      this.set("showSearchList", true);
    }
  }.observes('searchTerm'),
  actions: {
    clickWordFromList: function(word) {
      this.set("showSearchList", false);
      this.transitionToRoute("word", word);
    }
  }
});
