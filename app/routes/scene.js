import Route from '@ember/routing/route';

export default class SceneRoute extends Route {
  // Hooks
  model(params) {
    return this.store.findRecord('scene', params.scene_id);
  }
}
