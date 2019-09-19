import DS from 'ember-data';
const { Model, attr, hasMany } = DS;

export default class SceneModel extends Model {
  @attr() name;
  @attr() intro;
  @attr() loop;
  @hasMany('drink') drinks;
}
