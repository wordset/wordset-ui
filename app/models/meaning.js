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
    {id: 5, pos: "verb", def: "to walk very quickly", word: 5},
  {id: 6, pos: "noun", def: "a score in a baseball game", word: 5}
  ]
});

export default Meaning;
