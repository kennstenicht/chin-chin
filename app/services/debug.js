import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class DebugService extends Service {
  // Defaults
  @tracked infoEnabled = true;
  @tracked videoEnabled = false;
  @tracked effectEnabled = true;
  @tracked countEnabled = true;
  @tracked drinkCount = 0;


  // Hooks
  constructor() {
    super(...arguments);

    document.addEventListener('keypress', this._enableDebug.bind(this));
  }


  // Functions
  _enableDebug(e) {
    if(e.key == 'i') {
      this.infoEnabled = !this.infoEnabled;
    }
    if(e.key == 'v') {
      this.videoEnabled = !this.videoEnabled;
    }
    if(e.key == 'e') {
      this.effectEnabled = !this.effectEnabled;
    }
    if(e.key == 'c') {
      this.countEnabled = !this.countEnabled;
    }
  }
}
