import {
  moduleForModel,
  test
} from 'ember-qunit';

import Entry from "wordset/models/entry";
import Proposal from "wordset/models/proposal";
import Project from "wordset/models/project";
import Word from "wordset/models/word";
import User from "wordset/models/user";
import Vote from "wordset/models/vote";
import Activity from "wordset/models/activity";

moduleForModel('meaning', {
  // Specify the other units that are required for this test.
    needs: ['model:entry', 'model:proposal', 'model:word', 'model:user',
            'model:project', 'model:vote', 'model:activity']
});

test('it exists', function() {
  var model = this.subject();
  // var store = this.store();
  ok(!!model);
});
