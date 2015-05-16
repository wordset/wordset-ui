import Ember from 'ember';

export default Ember.Controller.extend({
  winningResult: function() {
    if(this.get("isComplete")) {
      var tally = Ember.Object.create();
      var selections = this.get("selections");
      Object.keys(selections).forEach(function(qid) {
        var answer = selections[qid];
        Object.keys(answer).forEach(function(resultId) {
          tally.incrementProperty(resultId, answer[resultId]);
        })
      })
      var winningResultId = Object.keys(tally).reduce(function(a, b){ return tally[a] > tally[b] ? a : b });
      var result = this.get(`model.results.${winningResultId}`);
      console.log(result);
      return result;
    } else {
      return null;
    }
  }.property("selections", "isComplete"),
  isComplete: function() {
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
