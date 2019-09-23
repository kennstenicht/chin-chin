import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class VideoComponent extends Component {
  // Services
  @service media;
  @service debug;
  @service videos;


  // Defaults
  block = "c-video";
  videoElement = null;
  @tracked isPlaying = false;


  // Actions
  @action
  setVideoElement(element) {
    this.videoElement = element;
    this.videos.setSrc(this.args.src, (src) => element.src = src);
  }

  @action
  ended() {
    if(this.args.hasStopped()) {
      this.args.hasStopped();
    }
  }
}
