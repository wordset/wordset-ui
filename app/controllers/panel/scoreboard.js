import Ember from "ember";

export default Ember.Controller.extend({
  needs: ["application"],
  currentUser: Ember.computed.alias('controllers.application.currentUser'),
  notifier: Ember.inject.service(),

  superior: function() {
    return this.get("list").get("firstObject");
  }.property("list.firstObject"),

  posterior: function() {
    return this.get("list").get("lastObject");
  }.property("list.lastObject"),

  pointsChanged: function() {
    var points = this.get("currentUser.points");
    var superior = this.get("superior.points");
    var posterior = this.get("posterior.points");
    if(superior < points) {
      this.send("win");
    } else if (posterior > points) {
      this.send("lose");
    } else {
    }
  }.observes("list.@each.points"),

  actions: {
    reloadList: function() {
      var _this = this;
      this.store.find("user", {user_id: this.get("currentUser.id")}).then(
        function(users) {
          _this.set ("list", users);
        }, function() {}
      );

    },
    win: function() {
      this.get("notifier").show("You just overtook " + this.get("superior.id"), {type: "Ranks", route: ["user.index", this.get("superior.id")]});
      this.send("reloadList");
    },
    lose: function() {
      this.get("notifier").show("You were just overtaken by " + this.get("posterior.id"), {type: "Ranks", route: ["user.index", this.get("posterior.id")]});
      this.send("reloadList");
    }
  }
});
