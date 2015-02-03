import DS from 'ember-data';
import Ember from 'ember';

var Proposal = DS.Model.extend({
  user: DS.belongsTo("user"),
  word: DS.belongsTo("word", {async: true}),
  //parent: DS.belongsTo("proposal", {async: true}),
  meaning: DS.belongsTo("meaning", {async: true}),

  parentId: DS.attr("string"),
  targetType: DS.attr("string"),
  targetId: DS.attr("string"),
  action: DS.attr("string"),
  reason: DS.attr("string"),
  delta: DS.attr(),
  state: DS.attr("string"),
  wordnet: DS.attr("boolean"),
  createdAt: DS.attr("date"),
  createClassName: DS.attr("string"),

  //prefetched display-shit
  original: DS.attr(),
  pos: DS.attr("string"),
  wordName: DS.attr("string"),
  originalUser: DS.attr("string"),
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
