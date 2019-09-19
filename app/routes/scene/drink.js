import Route from '@ember/routing/route';

export default class SceneDrinkRoute extends Route {
  // Hooks
  model(params) {
    return this.store.findRecord('drink', params.drink_id);
  }
}
