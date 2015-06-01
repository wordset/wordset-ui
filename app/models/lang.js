import DS from 'ember-data';

export default DS.Model.extend({
  seqs: DS.hasMany("seqs"),
  proposals: DS.hasMany("proposals"),
  projects: DS.hasMany("projects", {async: true}),
  //featured project
  project: DS.belongsTo("project", {inverse: null}),
  name: DS.attr("string"),
  parts: DS.attr(),
  labels: DS.hasMany("labels"),
  quizzesSimple: DS.attr(),
  postsSimple: DS.attr(),
});
