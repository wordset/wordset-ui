export default {
  name: 'session-initializer',
  initialize(container, application) {
    application.inject('controller', 'session', 'session:user');
    application.inject('component', 'session', 'session:user');
    application.inject('route', 'session', 'session:user');
    application.inject('model', 'session', 'session:user');
    application.inject('service', 'session', 'session:user');
  },
};
