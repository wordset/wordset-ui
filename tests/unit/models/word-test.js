import {
  moduleForModel,
  test
} from 'ember-qunit';

import Entry from "wordset/models/entry";
import Proposal from "wordset/models/proposal";
import Meaning from "wordset/models/meaning";
import User from "wordset/models/user";
import Project from "wordset/models/project";
import Vote from "wordset/models/vote";
import Activity from "wordset/models/activity";

moduleForModel('word', {
  // Specify the other units that are required for this test.
    needs: ["model:entry", "model:proposal", "model:meaning", "model:user",
            "model:project", "model:vote", "model:activity"]
});

test('it exists', function(assert) {
  var model = this.subject();
  // var store = this.store();
  assert.ok(!!model);
});
