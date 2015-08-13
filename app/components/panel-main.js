import Ember from "ember";

export default Ember.Component.extend({
  needs: ["application"],
  activeSubpanel: "chat",

  actions: {
    showSubpanel(panelName) {
      this.set("activeSubpanel", panelName);
    },
  }
});
