import Ember from 'ember';
import ENV from '../config/environment';

export default Ember.Service.extend({
  langs: {},

  load: function(lang) {
    var _this = this;
    return new Ember.Promise(function(resolve, reject) {
      Ember.$.getJSON(ENV.api + `/seqs/${lang}.list`).then(function(data) {
        console.log("Loaded " + lang);
        _this.langs[lang] = data.list;
        resolve();
      }, reject);
    });

  },

  perform: function(lang, term) {
    var _this = this;
    return new Ember.Promise(function(resolve) {
      var wordList = _this.get("langs." + lang);
      var results = [];
      var searchTerm = ", " + term;
      var lastIndex = -1;
      for(var i = 0; i < 10; i++) {
        lastIndex = wordList.indexOf(searchTerm, lastIndex+1);
        if(lastIndex >= 0) {
          var eowIndex = wordList.indexOf(", ", lastIndex +2);
          results.push(wordList.substring(lastIndex+2, eowIndex));
        } else {
          break;
        }
      }
      resolve(results);

      // on failure
      //reject(reason);
    });
  },

});
