import SimpleAuth from 'simple-auth';
import Ember from 'ember';

export default SimpleAuth.Session.extend({
  account: function() {
    var accountId = this.get('account_id');
    if (!Ember.isEmpty(accountId)) {
      return this.container.lookup('store:main').find('account', accountId);
    }
  }.property('account_id')
});
