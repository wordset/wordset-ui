import DS from 'ember-data';

var Meaning = DS.Model.extend({
  def: DS.attr('string'),
  pos: DS.attr('string'),
  word: DS.belongsTo('word')
});

Meaning.reopenClass({
  FIXTURES: [
{id: 1, pos: "noun", def: "delicious raw fish", word: 1},
    {id: 2, pos: "verb", def: "to strike", word: 2},
  {id: 3, pos: "noun", def: "a great success", word: 2},
{id: 4, pos: "adj",  def: "not having knowledge of something", word: 3},
    {id: 5, pos: "verb", def: "to walk very quickly", word: 5},
  {id: 6, pos: "noun", def: "a score in a baseball game", word: 5}
  ]
});

export default Meaning;
