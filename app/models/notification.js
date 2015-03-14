import DS from 'ember-data';

export default DS.Model.extend({
  activity: DS.belongsTo("activity", {inverse: null}),
});
