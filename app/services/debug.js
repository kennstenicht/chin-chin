import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class DebugService extends Service {
  @tracked infoEnabled = true;
  @tracked videoEnabled = false;

  constructor() {
    super(...arguments);

    document.addEventListener('keypress', this._enableDebug.bind(this));
  }

  _enableDebug(e) {
    if(e.key == 'i') {
      this.infoEnabled = !this.infoEnabled;
    }
    if(e.key == 'v') {
      this.videoEnabled = !this.videoEnabled;
    }
  }
}
