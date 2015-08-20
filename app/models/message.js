import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
  text: DS.attr("string"),
  user: DS.belongsTo('user', {
    async: false
  }),
  createdAt: DS.attr("date"),
  type: DS.attr("string"),
  url: DS.attr("string"),
  isLink: Ember.computed("type", function() {
    return this.get("type") === "link";
  }),
  isSelf: Ember.computed("type", function() {
    return this.get("type") === "self";
  }),
});
