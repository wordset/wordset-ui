import DS from 'ember-data';

var Meaning = DS.Model.extend({
  def: DS.attr('string'),
  pos: DS.attr('string')
});

Meaning.reopenClass({
  FIXTURES: [
    {id: 1, pos: "noun", def: "delicious raw fish"},
    {id: 2, pos: "verb", def: "to strike"},
    {id: 3, pos: "noun", def: "a great success"},
    {id: 4, pos: "adj",  def: "not having knowledge of something"},
    {id: 5, pos: "verb", def: "to walk very quickly"},
    {id: 6, pos: "noun", def: "a score in a baseball game"}
  ]
});

export default Meaning;
