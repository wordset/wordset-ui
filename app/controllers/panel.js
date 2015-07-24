import Ember from "ember";

export default Ember.Controller.extend({
  needs: ["application"],
  currentUser: Ember.computed.alias('controllers.application.currentUser'),
  showPanel: Ember.computed.alias('controllers.application.showPanel'),

  activeSubpanel: "chat",

  actions: {
    showSubpanel: function(panelName) {
      this.set("activeSubpanel", panelName);
    },
  }
});
