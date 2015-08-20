
export default {
  name: 'service-injector',
  initialize(registry) {
    registry.injection('controller', 'hup', 'service:hup');
    registry.injection('component', 'hup', 'service:hup');
    registry.injection('route', 'hup', 'service:hup');
    registry.injection('model', 'hup', 'service:hup');

    registry.injection('controller', 'notifier', 'service:notifier');
    registry.injection('component', 'notifier', 'service:notifier');
    registry.injection('route', 'notifier', 'service:notifier');

    registry.injection('controller', 'tracker', 'service:tracker');
    registry.injection('component', 'tracker', 'service:tracker');
    registry.injection('route', 'tracker', 'service:tracker');
    registry.injection('model', 'tracker', 'service:tracker');

    registry.injection('controller', 'pusher', 'service:pusher');
    registry.injection('component', 'pusher', 'service:pusher');
    registry.injection('route', 'pusher', 'service:pusher');
    registry.injection('model', 'pusher', 'service:pusher');

    registry.injection('controller', 'session', 'session:user');
    registry.injection('component', 'session', 'session:user');
    registry.injection('route', 'session', 'session:user');
    registry.injection('model', 'session', 'session:user');
    registry.injection('service', 'session', 'session:user');
  },
};
