import DS from 'ember-data';
import Ember from 'ember';

var Proposal = DS.Model.extend({
  user: DS.belongsTo("user", {async: true}),
  word: DS.belongsTo("word", {async: true}),
  proposal: DS.belongsTo("proposal", {async: true}),
  meaning: DS.belongsTo("meaning"),

  targetType: DS.attr("string"),
  targetId: DS.attr("string"),
  action: DS.attr("string"),
  delta: DS.attr(),
  state: DS.attr("string"),
  wordnet: DS.attr("boolean"),
  createdAt: DS.attr("date"),
});

Proposal.reopen({
  changeModel: function(model) {
    var delta = Ember.Object.create();
    this.set("targetId", model.id);
    this.set("targetType", model.proposableType);
    for(var i = 0; i < model.proposableFields.length; i++) {
      var name = model.proposableFields[i];
      delta.set(name, model.get(name));
    }
    this.set("word", model.word());
    this.set("action", "change");
    this.set("state", "new");
    this.set(model.get("proposableType"), model);
    this.set("delta", delta);
  }
});

export default Proposal;
