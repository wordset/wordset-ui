import {
  moduleForModel,
  test
} from 'ember-qunit';

moduleForModel('meaning', {
  // Specify the other units that are required for this test.
  needs: ['model:entry', 'model:proposal', 'model:wordset', 'model:user',
          'model:project', 'model:activity', "model:seq", "model:lang", "model:label"]
});

test('it exists', function(assert) {
  var model = this.subject();
  // var store = this.store();
  assert.ok(!!model);
});
