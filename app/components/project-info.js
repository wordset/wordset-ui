import Ember from 'ember';
import ProjectCountdown from '../mixins/project-countdown';

export default Ember.Component.extend( ProjectCountdown, {
  tagName: 'project-info',
  project: null,
  link: true,
  timer: null,
});
