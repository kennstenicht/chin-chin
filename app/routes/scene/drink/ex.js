import Route from '@ember/routing/route';

export default class SceneDrinkExRoute extends Route {
  // Hooks
  model() {
    return this.modelFor('scene.drink');
  }
}
