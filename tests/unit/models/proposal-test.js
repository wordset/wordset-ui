import {
  moduleForModel,
  test
} from 'ember-qunit';

moduleForModel('proposal', {
  // Specify the other units that are required for this test.
  needs: ["model:entry", "model:word", "model:meaning", "model:user",
          "model:project", "model:vote", "model:activity"]
});

test('it exists', function(assert) {
  var model = this.subject();
  // var store = this.store();
  assert.ok(!!model);
});
