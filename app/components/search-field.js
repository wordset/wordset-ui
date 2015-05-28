
import Ember from 'ember';

export default Ember.TextField.extend({
  attributeBindings: [
    'aria-haspopup',
    'aria-autocomplete',
  ],
});
