import {
  moduleForModel,
  test
} from 'ember-qunit';

moduleForModel('entry', {
  // Specify the other units that are required for this test.
  needs: ["model:word", "model:meaning", "model:proposal"]
});

test('it exists', function(assert) {
  var model = this.subject();
  // var store = this.store();
  assert.ok(!!model);
});
