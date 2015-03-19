import {
  moduleForModel,
  test
} from 'ember-qunit';

moduleForModel('entry', {
  // Specify the other units that are required for this test.
  needs: ["model:word", "model:proposal", "model:meaning", "model:user",
          "model:project", "model:vote", "model:activity"]
});

test('it exists', function(assert) {
  var model = this.subject();
  // var store = this.store();
  assert.ok(!!model);
});
