import DS from 'ember-data';
import Ember from 'ember';

var Suggestion = DS.Model.extend({
  targetType: DS.attr("string"),
  targetId: DS.attr("string"),
  action: DS.attr("string"),
  changes: DS.attr(),
  status: DS.attr("string"),
  user: DS.belongsTo("user"),
});

Suggestion.reopen({
  changeModel: function(model) {
    var data = Ember.Object.create();
    this.set("targetId", model.id);
    this.set("targetType", model.suggestableType);
    for(var i = 0; i < model.suggestableFields.length; i++) {
      var name = model.suggestableFields[i];
      data.set(name, model.get(name));
    }
    this.set("action", "change");
    this.set("changes", data);
  }
});

export default Suggestion;
