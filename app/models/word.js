import DS from 'ember-data';

var Word = DS.Model.extend({
  name: DS.attr('string'),
  meanings: DS.hasMany('meanings')
});

Word.reopenClass({
  FIXTURES: [
    {id: 1, name: "sushi", meanings: [1]},
    {id: 2, name: "smash", meanings: [2, 3]},
    {id: 3, name: "hit", meanings: [2, 3]},
    {id: 4, name: "naive", meanings: [4]},
    {id: 5, name: "run", meanings: [5, 6]}
  ]
});

export default Word;
