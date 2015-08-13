import Ember from 'ember';
/* global JsDiff */

export default Ember.Helper.extend({
  compute(params, hash) {
    var o = params[0];
    var n = params[1];
    var diff = JsDiff.diffWordsWithSpace(o, n);
    var output = "";
    diff.forEach(function(part) {
      var tag = part.added ? 'ins' :
        part.removed ? 'del' : 'span';
      var escaped = Ember.Handlebars.Utils.escapeExpression(part.value);
      output = output + '<' + tag + '>' + escaped + '</' + tag + '>';
    });

    return new Ember.Handlebars.SafeString(output);
  }
});
