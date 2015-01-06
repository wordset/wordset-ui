import DS from 'ember-data';

var Meaning = DS.Model.extend({
  def: DS.attr('string'),
  pos: DS.attr('string'),
  quote: DS.attr('string'),
  word: DS.belongsTo('word')
});

Meaning.reopenClass({
  FIXTURES: [
{id: 1, pos: "noun", def: "delicious raw fish", quote: "Sushi originated in Japan.", word: 1},
    {id: 2, pos: "verb", def: "to strike something with an object", quote: "He smashed the ball with his bat.", word: 2},
  {id: 3, pos: "noun", def: "a great success, particularly in the fields of television, broadway or the movies", quote: "That play was a smash!", word: 2},
{id: 4, pos: "adj",  def: "not having knowledge of something", word: 3},
    {id: 5, pos: "verb", def: "to walk very quickly", quote: "The boy runs towards the store.", word: 5},
  {id: 6, pos: "noun", def: "a score in a baseball game", quote: "The Giants got five runs.", word: 5},
{id: 7, pos: "noun", def: "a mar in a pair of stockings or tights (Brit.)", quote: "I just found a run in my tights!", word: 5},
{id: 8, pos: "proper noun", def: "a brand of instant mashed potato (Brit.)", quote: "I would love some Smash right about now!", word: 2}
  ]
});

export default Meaning;
