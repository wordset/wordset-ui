import Ember from 'ember';

export default Ember.Controller.extend({
  needs: ['application'],
  currentUser: Ember.computed.alias('controllers.application.currentUser'),

  description: function() {
    if(this.get("model.name") === "Proper Noun Purge") {
      return "<p>We're starting to implement projects on our site. These are self-contained groups of improvements we want to make to Wordset.</p><p>Our first major project is to remove proper nouns from Wordset. We believe that our dictionary should be about definitions, not reference. A dictionary is not the place to gather in-depth information about a person or place. That's what an encyclopedia is for.</p>".htmlSafe();
    } else if(this.get("model.name") === "Parantheses Roundup") {
      return "<p>Our next major project is to remove parantheses from definitions. You'll have seen them everywhere – '(in law)', '(slang)', and so on.</p><p>The information contained within the parantheses is useful, but the parantheses themselves break up the definition too much. We want to put the paranthetical back into the definition so it reads more smoothly.</p><p>To help out, you'll be directed to a definition with some parantheses. Just edit the definition to remove them and submit it!</p>".htmlSafe();
    }
  }.property("model.name"),

  actions: {
    signUp: function() {
      this.transitionToRoute("users.new");
    }
  }
});
