import Ember from 'ember';
import DS from 'ember-data';
import ENV from '../config/environment';

export default DS.Model.reopenClass({

}).extend({
  type: DS.attr("string"),
  user: DS.belongsTo('user', {
    async: false
  }),
  lang: DS.belongsTo('lang', {
    inverse: null,
    async: false
  }),
  wordset: DS.belongsTo('wordset', {async: true}),
  project: DS.belongsTo('project', {
    inverse: null,
    async: false
  }),
  wordName: DS.attr("string"),
  reason: DS.attr("string"),
  state: DS.attr("string"),
  createdAt: DS.attr("date"),
  tally: DS.attr("number"),
  activities: DS.hasMany('activity', {
    async: false
  }),
  flagged: DS.attr("boolean"),
  userVoteIds: DS.attr(),

  // NewWord
  meanings: DS.attr(),

  // MeaningLike
  def: DS.attr("string"),
  example: DS.attr("string"),
  labels: DS.hasMany('labels', {
    serialize: true,
    async: false
  }),

  // ChangeMeaning
  meaning: DS.belongsTo('meaning', {
    inverse: null,
    async: false
  }),
  original: DS.attr(),
  parentId: DS.attr(),

  // NewMeaning
  pos: DS.attr("string"),

  typeName: Ember.computed("type", function() {
    if(this.get("type") === "NewWordset") {
      return "New Word";
    } else if(this.get("type") === "NewMeaning") {
      return "New Meaning";
    } else if(this.get("type") === "MeaningChange") {
      return "Change";
    } else if(this.get("type") === "MeaningRemoval") {
      return "Removal";
    }
  }),
  isRemoval: Ember.computed("type", function() {
    return (this.get("type") === "MeaningRemoval");
  }),
  isEditableType: Ember.computed("typeName", function() {
    return (this.get("type") !== "MeaningRemoval");
  }),
  positiveTally: Ember.computed("tally", function() {
    if(this.get("tally") > 0 ) {
      return "width: " + this.get("tally") + "%;";
    } else {
      return "";
    }
  }),
  negativeTally: Ember.computed("tally", function() {
    if(this.get("tally") < 0 ) {
      return "width: " + (this.get("tally") * -1) + "%;";
    } else {
      return "";
    }
  }),

  originalLabels: Ember.computed("original.labels", function() {
    var _this = this;
    if(Ember.isEmpty(this.get("original.labels"))) { return []; }
    return this.store.filter('label', function(label) {
      return _this.get("original.labels").contains("" + label.id);
    });
  }),

});
