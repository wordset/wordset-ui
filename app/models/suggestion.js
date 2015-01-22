import DS from 'ember-data';
import Ember from 'ember';

var Suggestion = DS.Model.extend({
  targetType: DS.attr("string"),
  targetId: DS.attr("string"),
  action: DS.attr("string"),
  delta: DS.attr(),
  status: DS.attr("string"),
  user: DS.belongsTo("user"),
  word: DS.belongsTo("word"),
});

Suggestion.reopen({
  changeModel: function(model) {
    var delta = Ember.Object.create();
    this.set("targetId", model.id);
    this.set("targetType", model.suggestableType);
    for(var i = 0; i < model.suggestableFields.length; i++) {
      var name = model.suggestableFields[i];
      delta.set(name, model.get(name));
    }
    this.set("word", model.word());
    this.set("action", "change");
    this.set("delta", delta);
  }
});

export default Suggestion;
