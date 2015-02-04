import Ember from 'ember';

export default Ember.ObjectController.extend({
  searchTerm: "",
  showSearchList: false,
  searchLoading: false,
  wordList: null,
  searchTermObserver: function() {
    if(this.get("searchTerm") === "") {
      this.set("showSearchList", false);
      this.set("searchLoading", false);
      this.set("wordList", null);
    } else {
      this.set("searchLoading", true);
      var _this = this;
      this.store.find('word_list', this.get('searchTerm'))
        .then(function(wordList) {
          _this.set("showSearchList", true);
          _this.set("searchLoading", false);
          _this.set("wordList", wordList);
        });
    }
  }.observes('searchTerm'),
  actions: {
    clickWordFromList: function(word) {
      this.set("showSearchList", false);
      this.transitionToRoute("word", word);
    },
    clear: function() {
      var input = document.getElementById("searchForWord");
      input.value = '';
      input.focus();
    },
    openmenu: function() {
      var body = document.body,
      mask = document.createElement("div"),
      toggleSlideRight = document.querySelector( ".toggle-slide-right" ),
      slideMenuRight = document.querySelector( ".slide-menu-right" ),
      activeNav  ;
      mask.className = "mask";


      /* slide menu right */
      toggleSlideRight.addEventListener( "click", function(){
          classie.add( body, "smr-open" );
          document.body.appendChild(mask);
          activeNav = "smr-open";
      } );

      /* hide active menu if mask is clicked */
      mask.addEventListener( "click", function(){
          classie.remove( body, activeNav );
          activeNav = "";
          document.body.removeChild(mask);
      } );

      /* hide active menu if close menu button is clicked */
      [].slice.call(document.querySelectorAll(".close-menu")).forEach(function(el,i){
          el.addEventListener( "click", function(){
              classie.remove( body, activeNav );
              activeNav = "";
              document.body.removeChild(mask);
          } );
      });
    }
  }
});


/*!
 * classie v1.0.1
 * class helper functions
 * from bonzo https://github.com/ded/bonzo
 * MIT license
 *
 * classie.has( elem, 'my-class' ) -> true/false
 * classie.add( elem, 'my-new-class' )
 * classie.remove( elem, 'my-unwanted-class' )
 * classie.toggle( elem, 'my-class' )
 */

/*jshint browser: true, strict: true, undef: true, unused: true */
/*global define: false, module: false */

( function( window ) {

'use strict';

// class helper functions from bonzo https://github.com/ded/bonzo

function classReg( className ) {
  return new RegExp("(^|\\s+)" + className + "(\\s+|$)");
}

// classList support for class management
// altho to be fair, the api sucks because it won't accept multiple classes at once
var hasClass, addClass, removeClass;

if ( 'classList' in document.documentElement ) {
  hasClass = function( elem, c ) {
    return elem.classList.contains( c );
  };
  addClass = function( elem, c ) {
    elem.classList.add( c );
  };
  removeClass = function( elem, c ) {
    elem.classList.remove( c );
  };
}
else {
  hasClass = function( elem, c ) {
    return classReg( c ).test( elem.className );
  };
  addClass = function( elem, c ) {
    if ( !hasClass( elem, c ) ) {
      elem.className = elem.className + ' ' + c;
    }
  };
  removeClass = function( elem, c ) {
    elem.className = elem.className.replace( classReg( c ), ' ' );
  };
}

function toggleClass( elem, c ) {
  var fn = hasClass( elem, c ) ? removeClass : addClass;
  fn( elem, c );
}

var classie = {
  // full names
  hasClass: hasClass,
  addClass: addClass,
  removeClass: removeClass,
  toggleClass: toggleClass,
  // short names
  has: hasClass,
  add: addClass,
  remove: removeClass,
  toggle: toggleClass
};

// transport
if ( typeof define === 'function' && define.amd ) {
  // AMD
  define( classie );
} else if ( typeof exports === 'object' ) {
  // CommonJS
  module.exports = classie;
} else {
  // browser global
  window.classie = classie;
}

})( window );
