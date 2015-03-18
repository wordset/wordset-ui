import {
  moduleForModel,
  test
} from 'ember-qunit';

moduleForModel('meaning', {
  // Specify the other units that are required for this test.
  needs: ['model:entry', 'model:proposal']
});

test('it exists', function() {
  var model = this.subject();
  // var store = this.store();
  ok(!!model);
});
