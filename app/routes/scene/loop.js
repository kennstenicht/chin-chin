import Route from '@ember/routing/route';

export default class SceneLoopRoute extends Route {
  model() {
    return this.modelFor('scene');
  }
}
