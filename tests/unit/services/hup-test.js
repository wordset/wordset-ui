import {
  moduleFor,
  test
} from 'ember-qunit';
import Ember from 'ember';

moduleFor('service:hup', {
  // Specify the other units that are required for this test.
  // needs: ['service:foo']
});

// Replace this with your real tests.
test('it can be sent a hup', function(assert) {
  var hup = this.subject();
  assert.ok(hup.get("at") instanceof Date);
  hup.to();
  var second = hup.get("at");
  assert.ok(second instanceof Date);
  hup.to();
  assert.ok(hup.get("at") instanceof Date);
  assert.notEqual(second, hup.get("at"));
});
