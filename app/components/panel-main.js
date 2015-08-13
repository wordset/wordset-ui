import Ember from "ember";

export default Ember.Component.extend({
  activeSubpanel: "chat",

  actions: {
    showSubpanel(panelName) {
      this.set("activeSubpanel", panelName);
    },
  }
});
