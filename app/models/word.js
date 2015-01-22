import DS from 'ember-data';

var Word = DS.Model.extend({
  name: DS.attr('string'),
  entries: DS.hasMany('entries'),
  suggestions: DS.hasMany('suggestions'),
});

Word.reopenClass({
});

export default Word;
