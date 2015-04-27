import DS from 'ember-data';

export default DS.Model.extend({
  seqs: DS.hasMany("seqs"),
  proposals: DS.hasMany("proposals"),
  name: DS.attr("string"),
  parts: DS.attr(),
  labels: DS.hasMany("labels"),
});
