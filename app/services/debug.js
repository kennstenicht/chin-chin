import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class DebugService extends Service {
  @tracked enabled = true;

  constructor() {
    super(...arguments);

    document.addEventListener('keypress', this._enableDebug.bind(this));
  }

  _enableDebug(e) {
    if(e.key == 'd') {
      this.enabled = !this.enabled;
    }
  }
}
