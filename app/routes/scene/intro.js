import Route from '@ember/routing/route';
import { action } from '@ember/object';

export default class SceneIntroRoute extends Route {
  // Hooks
  model() {
    return this.modelFor('scene');
  }

  // Actions
  @action
  transitionToSceneLoop() {
    this.transitionTo('scene.loop', this.modelFor('scene'));
  }
}
