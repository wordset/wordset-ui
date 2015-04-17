
export default {
  name: 'notifier-initializer',
  initialize: function(container, application) {
    application.inject('controller', 'notifier', 'service:notifier');
    application.inject('component', 'notifier', 'service:notifier');
    application.inject('route', 'notifier', 'service:notifier');
  },
};
