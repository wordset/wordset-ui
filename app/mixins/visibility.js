import Ember from 'ember';

// used by the Application controller

export default Ember.Mixin.create({
  init: function() {
    this._super();
    var hidden, visibilityChange, visibilityState;
    if (typeof document.hidden !== "undefined") {
        hidden = "hidden"; visibilityChange = "visibilitychange"; visibilityState = "visibilityState";
    }
    else if (typeof document.mozHidden !== "undefined") {
        hidden = "mozHidden"; visibilityChange = "mozvisibilitychange"; visibilityState = "mozVisibilityState";
    }
    else if (typeof document.msHidden !== "undefined") {
        hidden = "msHidden"; visibilityChange = "msvisibilitychange"; visibilityState = "msVisibilityState";
    }
    else if (typeof document.webkitHidden !== "undefined") {
        hidden = "webkitHidden"; visibilityChange = "webkitvisibilitychange"; visibilityState = "webkitVisibilityState";
    }

    var _this = this;
    var determineVisibility = function() {
        switch (document[visibilityState]) {
        case "visible":
            _this.set("visible", true);
            break;
        case "hidden":
            _this.set("visible", false);
            break;
        }
    };
    document.addEventListener(visibilityChange, determineVisibility);
    window.onblur = function() {
      _this.set("visible", false);
    };
    window.onfocus = determineVisibility;
    this.set("visible", document[visibilityState] === "visible");
  }
});
