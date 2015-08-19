import Ember from 'ember';
import EmberValidations from 'ember-validations';
import ENV from '../config/environment';

export default Ember.Component.extend( EmberValidations, {
  classNames: ["edit-seq-inputs"],
  status: {},
  validations: {
    "seq.text": {
      presence: true,
    },
  },
  /* This is only required because ember-validations doesn't correctly observe child errors */
  hupHack: function() {
    this.hup.to();
  }.observes("seq.text"),
  checkExistingSeq: function() {
    var name = this.get("seq.text");
    if(this.get("seq.action") === "add") {
      var _this = this;
      if(name && (name.length > 0)) {
        const url = ENV.api + "/proposals/new-word-status/" + this.get("lang.id") + "/" + name;
        Ember.$.getJSON(url).then((data) => this.set('status', data));
      }
    }
  }.observes("seq.text"),
  actions: {
    remove() {
      if(this.get("seq.action") === "add") {
        this.get("targetObject.changes.seqs").removeObject(this.get("seq"));
        this.hup.to();
      }
    },
  }
});
