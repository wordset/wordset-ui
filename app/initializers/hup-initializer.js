
export default {
  name: 'hup-initializer',
  initialize: function(container, application) {
    application.inject('controller', 'hup', 'service:hup');
    application.inject('component', 'hup', 'service:hup');
    application.inject('route', 'hup', 'service:hup');
  },
};
