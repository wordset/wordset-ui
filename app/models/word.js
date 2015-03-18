import DS from 'ember-data';

export default DS.Model.extend({
  entries: DS.hasMany('entries'),
  proposals: DS.hasMany('proposals', {async: true}),

  entryForPos: function(pos) {
    return this.get("entries").find(function(entry) {
      return entry.get("pos") === pos;
    });
  },
});
