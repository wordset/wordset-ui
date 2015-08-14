import Ember from 'ember';
import DS from 'ember-data';
import ENV from '../config/environment';

export default DS.Model.extend({
  user: DS.belongsTo('user', {
    async: false
  }),
  lang: DS.belongsTo('lang', {
    inverse: null,
    async: false
  }),
  projects: DS.hasMany('project', {
    inverse: null,
    async: false
  }),
  wordset: DS.belongsTo("wordset", {async: false}),
  changes: DS.attr(),
  activitiesSimple: DS.attr(),
  reason: DS.attr("string"),
  state: DS.attr("string"),
  createdAt: DS.attr("date"),
  tally: DS.attr("number"),
  points: DS.attr("number"),
  activities: DS.hasMany('activity', {
    async: false
  }),
  flagged: DS.attr("boolean"),
  userVoteIds: DS.attr(),

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
