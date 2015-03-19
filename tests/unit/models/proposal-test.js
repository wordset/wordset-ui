import DS from 'ember-data';
import Ember from 'ember';

import {moduleForModel,  test} from 'ember-qunit';

import Word from "wordset/models/word";
import Meaning from "wordset/models/meaning";
import User from "wordset/models/user";
import Project from "wordset/models/project";
import Vote from "wordset/models/vote";
import Activity from "wordset/models/activity";
import Entry from "wordset/models/entry";

moduleForModel('proposal', {
  // Specify the other units that are required for this test.
    needs: ["model:meaning", "model:word", "model:user", "model:project",
            "model:vote", "model:activity"]
});

test('it exists', function(assert) {
  var model = this.subject();
  // var store = this.store();
  assert.ok(!!model);
});
