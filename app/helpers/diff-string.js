import Ember from 'ember';

import { jsdiff } from '../utils/jsdiff';

export function diffString(original, newString) {
  return jsdiff(original, newString);
}

export default Ember.Handlebars.makeBoundHelper(diffString);
