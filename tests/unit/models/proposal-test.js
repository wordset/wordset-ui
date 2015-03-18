import {
  moduleForModel,
  test
} from 'ember-qunit';

moduleForModel('proposal', {
  // Specify the other units that are required for this test.
  needs: ["model:meaning", "model:word", "model:user", "model:project", "model:vote"]
});

test('it exists', function(assert) {
  var model = this.subject();
  // var store = this.store();
  assert.ok(!!model);
});
