import DS from 'ember-data';

var Word = DS.Model.extend({
  name: DS.attr('string'),
  meanings: DS.hasMany('meaning', {async:true})
});

Word.reopenClass({
  FIXTURES: [
    {id: 1, name: "sushi", meanings: [1]},
  {id: 2, name: "smash", meanings: [2, 3, 8]},
    {id: 3, name: "naive", meanings: [4]},
    {id: 4, name: "run",   meanings: [5, 6, 7]}
  ]
});

export default Word;
