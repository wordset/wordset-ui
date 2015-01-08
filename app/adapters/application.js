import DS from 'ember-data';
import ENV from 'wordset/config/environment';

export default DS.ActiveModelAdapter.extend({
  host: ENV.apiHost,
  namespace: "api/v1"
});
