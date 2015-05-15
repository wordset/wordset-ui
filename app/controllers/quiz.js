import Ember from 'ember';

export default Ember.Controller.extend({
  selections: {},
  winningResult: function() {
    if(this.get("isComplete")) {
      return this.get("model.results.0");
    } else {
      return null;
    }
  }.property("selections", "isComplete"),
  isComplete: function() {
    console.log(Object.keys(this.get("selections")).length);
    return Object.keys(this.get("selections")).length === this.get("model.questions").length;
  }.property("selections"),
  actions: {
    selectedAnswer: function(answer) {
      answer = answer.split("-");
      var qid = answer[0];
      var aid = answer[1];

      this.set("selections." + qid,
              this.get(`model.questions.${qid}.answers.${aid}.result_values`));
      this.notifyPropertyChange("selections");
    }
  }
});
