import DS from 'ember-data';

export default DS.Model.extend({
  activity: DS.belongsTo('activity', {
    inverse: null,
    async: false
  }),
  createdAt: DS.attr("date"),
});
