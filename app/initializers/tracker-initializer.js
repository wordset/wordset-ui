export default {
  name: 'tracker-initializer',
  initialize(container, application) {
    application.inject('controller', 'tracker', 'service:tracker');
    application.inject('component', 'tracker', 'service:tracker');
    application.inject('route', 'tracker', 'service:tracker');
    application.inject('model', 'tracker', 'service:tracker');
  },
};
