import DS from 'ember-data';

export default DS.Model.extend({
  proposal: DS.belongsTo("proposal"),
  user: DS.belongsTo("user"),
  yae: DS.attr("boolean"),
  value: DS.attr("number"),
  flagged: DS.attr("boolean"),
  comment: DS.attr("string"),
  usurped: DS.attr("boolean")
});
