import DS from 'ember-data';

var WordList = DS.Model.extend({
  term: DS.attr('string'),
  results: DS.attr()
});

export default WordList;
