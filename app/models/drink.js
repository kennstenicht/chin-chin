import DS from 'ember-data';
const { Model, attr } = DS;

export default class DrinkModel extends Model {
  @attr() name;
  @attr() intro;
  @attr() ex;
}
