
export default {
  name: 'hup-initializer',
  initialize(container, application) {
    application.inject('controller', 'hup', 'service:hup');
    application.inject('component', 'hup', 'service:hup');
    application.inject('route', 'hup', 'service:hup');
    application.inject('model', 'hup', 'service:hup');
  },
};
