import DS from 'ember-data';

var Word = DS.Model.extend({
  name: DS.attr('string'),
  entries: DS.hasMany('entries'),
  proposals: DS.hasMany('proposals'),
});

Word.reopenClass({
});

export default Word;
