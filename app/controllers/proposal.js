import Ember from 'ember';

export default Ember.ObjectController.extend({
  needs: ['application'],
  isAdmin: Ember.computed.alias('controllers.application.isAdmin'),
  isOpen: function() {
    return (this.get("state") === "open");
  }.property("state"),
  isNewMeaning: function() {
    return ("NewMeaning" === this.get("type"));
  }.property("type"),
  isNewWord: function() {
    return ("NewWord" === this.get("type"));
  }.property("type"),
  isMeaningChange: function() {
    return ("MeaningChange" === this.get("type"));
  }.property("type"),
  positiveTally: function() {
    if(this.get("tally") > 0 ) {
      return "width: " + this.get("tally") + "%;";
    } else {
      return "";
    }
  }.property("tally"),
  negativeTally: function() {
    if(this.get("tally") < 0 ) {
      return "width: " + (this.get("tally") * -1) + "%;";
    } else {
      return "";
    }
  }.property("tally"),
  actions: {
    approveProposal: function() {
      var model = this.get("model");
      var _this = this;
      var task = this.get('content');
      var adapter = this.container.lookup('adapter:application');
      var url = adapter.buildURL('proposal', this.get("model").get('id')) + '/approve';
      adapter.ajax(url, 'PUT')
        .then(function(response) {
          _this.get("model").set("state", "accepted");
        });
    }
  }

});
