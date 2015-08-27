import Ember from 'ember';

// This mixin is used to scroll back to (0,0) on transitions
// To use it, just import the mixin and extend it on the
// necessary route. So far, I've added it to users/index,
// proposal, proposals, and seq.

export default Ember.Mixin.create({
  activate: function() {
    this._super();
    console.log("Scrolling back to top");
    window.scrollTo(0,0);
  }
});
