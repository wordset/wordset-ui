import Ember from 'ember';
import DS from 'ember-data';
import ENV from '../config/environment';

export default DS.Model.reopenClass({
  random: function(proposal_id) {
    var path = "/proposals/next";
    if(proposal_id) {
      path += "?proposal_id=" + proposal_id;
    }
    return (new Ember.RSVP.Promise(function(resolve, reject) {
      Ember.$.getJSON(ENV.api + path).then(
        function(data) {
          resolve(data);
        }, reject);
    }));
  },
}).extend({
  type: DS.attr("string"),
  user: DS.belongsTo("user"),
  lang: DS.belongsTo("lang"),
  wordset: DS.belongsTo("wordset", {async: true}),
  project: DS.belongsTo("project", {inverse: null}),
  wordName: DS.attr("string"),
  reason: DS.attr("string"),
  state: DS.attr("string"),
  createdAt: DS.attr("date"),
  tally: DS.attr("number"),
  votes: DS.hasMany("vote"),
  activities: DS.hasMany("activity"),
  flagged: DS.attr("boolean"),

  // NewWord
  meanings: DS.attr(),

  // MeaningLike
  def: DS.attr("string"),
  example: DS.attr("string"),
  labels: DS.hasMany("labels", {serialize: true}),

  // ChangeMeaning
  meaning: DS.belongsTo("meaning", {inverse: null}),
  original: DS.attr(),
  parentId: DS.attr(),

  // NewMeaning
  pos: DS.attr("string"),

  typeName: function() {
    if(this.get("type") === "NewWordset") {
      return "New Word";
    } else if(this.get("type") === "NewMeaning") {
      return "New Meaning";
    } else if(this.get("type") === "MeaningChange") {
      return "Change";
    } else if(this.get("type") === "MeaningRemoval") {
      return "Removal";
    }
  }.property("type"),
  isRemoval: function() {
    return (this.get("type") === "MeaningRemoval");
  }.property("type"),
  isEditableType: function() {
    return (this.get("type") !== "MeaningRemoval");
  }.property("typeName"),
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

  originalLabels: function() {
    var _this = this;
    if(Ember.isEmpty(this.get("original.labels"))) { return []; }
    return this.store.filter("label", function(label) {
      return _this.get("original.labels").contains("" + label.id);
    });
  }.property("original.labels"),

});
