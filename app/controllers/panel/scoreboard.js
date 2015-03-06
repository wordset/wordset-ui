import Ember from "ember";

export default Ember.Controller.extend({
  needs: ["application"],
  currentUser: Ember.computed.alias('controllers.application.currentUser'),

  superior: function() {
    return this.get("list").get("firstObject");
  }.property("list.firstObject"),

  posterior: function() {
    return this.get("list").get("lastObject");
  }.property("list.lastObject"),

  pointsChanged: function() {
    var points = this.get("currentUser.points");
    // if(this.get("superior")) {
    //   if(this.get("superior.points") < points) {
    //     this.send("win");
    //   } else if (this.get("posterior.points") > points) {
    //     this.send("lose");
    //   } else {
    //     console.log("nochange");
    //   }
    // }
  }.observes("list.@each.points"),

  actions: {
    reloadList: function() {
      var users = this.store.find("user", {user_id: this.get("currentUser.id")});
      this.set("list", users);
    },
    win: function() {
      this.flash.success("You just overtook " + this.get("superior.id"));
      this.send("reloadList");
    },
    lose: function() {
      this.flash.notice("You were just overtaken by " + this.get("posterior.id"));
      this.send("reloadList");
    }
  }
});
