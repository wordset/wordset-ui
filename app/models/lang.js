import DS from 'ember-data';

export default DS.Model.extend({
  seqs: DS.hasMany('seqs', {
    async: false
  }),
  proposals: DS.hasMany('proposals', {
    async: false
  }),
  projects: DS.hasMany('projects', {async: true}),
  //featured project
  project: DS.belongsTo('project', {
    inverse: null,
    async: false
  }),
  name: DS.attr("string"),
  parts: DS.attr(),
  labels: DS.hasMany('labels', {
    async: false
  }),
  quizzesSimple: DS.attr(),
  postsSimple: DS.attr(),
});
