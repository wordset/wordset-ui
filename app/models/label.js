import DS from "ember-data";

export default DS.Model.extend({
  lang: DS.belongsTo('lang', {
    async: false
  }),
  name: DS.attr("string"),
  isDialect: DS.attr("boolean"),
  forSeq: DS.attr("boolean"),
  forMeaning: DS.attr("boolean"),
  speechParts: DS.attr(),

  proposals: DS.hasMany('proposals', {
    async: false
  }),

  // This is for the weird tree relationship that's
  // going on with labels able to be owned by other
  // labels – e.g. dialect nesting
  children: DS.hasMany('labels', {
    inverse: "parent",
    async: false
  }),
  parent: DS.belongsTo('label', {
    inverse: "children",
    async: false
  }),
});
