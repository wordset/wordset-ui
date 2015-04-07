import DS from 'ember-data';

export default DS.Model.extend({
  seqs: DS.hasMany('seqs'),
  entries: DS.hasMany('entries'),
  proposals: DS.hasMany('proposals', {async: true}),
  name: DS.attr('string'),
  lang: DS.belongsTo('lang'),

  entryForPos: function(pos) {
    return this.get("entries").find(function(entry) {
      return entry.get("pos") === pos;
    });
  },
});
