import Route from '@ember/routing/route';
import { action } from '@ember/object';

export default class SceneDrinkIntroRoute extends Route {
  // Hooks
  model() {
    return this.modelFor('scene.drink');
  }


  // Actions
  @action
  transitionToDrinkEx() {
    this.transitionTo(
      'scene.drink.ex',
      this.modelFor('scene'),
      this.modelFor('scene.drink')
    );
  }
}
