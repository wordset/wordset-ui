import DS from 'ember-data';

var model = DS.Model.extend({
  word: DS.belongsTo('word'),
  user: DS.belongsTo('user'),
  entries: DS.attr(),
  reason: DS.attr()
});

export default model;
