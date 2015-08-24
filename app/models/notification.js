import DS from 'ember-data';

export default DS.Model.extend({
  activity: DS.belongsTo('activity', {
    async: false
  }),
  createdAt: DS.attr("date"),
});
