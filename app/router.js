import EmberRouter from '@ember/routing/router';
import config from './config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function() {
  this.route('scene', { path: 'scenes/:scene_id' }, function() {
    this.route('intro');
    this.route('loop');
    this.route('drink', { path: 'drinks/:drink_id' }, function() {
      this.route('intro');
      this.route('ex');
    });
  });
});
