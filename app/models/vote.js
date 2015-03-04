import DS from 'ember-data';

export default DS.Model.extend({
  proposal: DS.belongsTo("proposal"),
  user: DS.belongsTo("user"),
  type: DS.attr("string"),
  flagged: DS.attr("boolean"),
  comment: DS.attr("string"),
  usurped: DS.attr("boolean"),
  withdrawn: DS.attr("boolean")
});
