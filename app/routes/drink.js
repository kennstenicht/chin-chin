import Route from '@ember/routing/route';
import { A } from '@ember/array';

export default class DrinkRoute extends Route {
  // Defaults
  drinks = A([{
      id: "0",
      name: 'Wodka',
      video: '/assets/videos/drink.mov'
    },{
      id: "1",
      name: 'Korn',
      video: '/assets/videos/drink.mov'
    },{
      id: "2",
      name: 'Berliner Luft',
      video: '/assets/videos/drink.mov'
    }]);


  // Hooks
  model(params) {
    return this.drinks.findBy('id', params.id);
  }
}
