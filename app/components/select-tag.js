import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    change() {
      const selectedEl = this.$('select')[0];
      const selectedIndex = selectedEl.selectedIndex;
      const content = this.get('content');
      const selectedValue = content[selectedIndex];

      this.set('value', selectedValue);
    }
  }
});
