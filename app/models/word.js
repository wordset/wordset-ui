import DS from 'ember-data';

var Word = DS.Model.extend({
  name: DS.attr('string'),
  entries: DS.hasMany('entries'),
  proposals: DS.hasMany('proposals', {async: true}),

  entryForPos: function(pos) {
    return this.get("entries").find(function(entry) {
      return entry.get("pos") === pos;
    });
  },
});

Word.reopenClass({

});

export default Word;
