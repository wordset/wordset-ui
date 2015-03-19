import {
  moduleForModel,
  test
} from 'ember-qunit';

import Proposal from "wordset/models/proposal";
import Vote from "wordset/models/vote";
import Word from "wordset/models/word";

moduleForModel('user', {
  // Specify the other units that are required for this test.
  needs: ["model:proposal", "model:vote", "model:word"]
});

test('it exists', function(assert) {
  var model = this.subject();
  // var store = this.store();
  assert.ok(!!model);
});
