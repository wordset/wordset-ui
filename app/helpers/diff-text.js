import Ember from 'ember';
/* global JsDiff */

export function diffText(o, n) {
  var diff = JsDiff.diffWords(o, n);
  var output = "";
  diff.forEach(function(part) {
    var tag = part.added ? 'ins' :
      part.removed ? 'del' : 'span';
    var escaped = Ember.Handlebars.Utils.escapeExpression(part.value);
    output = output + '<' + tag + '>' + escaped + '</' + tag + '>';
  });

  return new Ember.Handlebars.SafeString(output);
}

export default Ember.Handlebars.makeBoundHelper(diffText);
