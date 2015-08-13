export default {
  name: 'tracker-initializer',
  initialize: function(container, application) {
    application.inject('controller', 'tracker', 'service:tracker');
    application.inject('component', 'tracker', 'service:tracker');
    application.inject('route', 'tracker', 'service:tracker');
    application.inject('model', 'tracker', 'service:tracker');
  },
};
