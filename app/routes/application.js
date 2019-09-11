import Route from '@ember/routing/route';
import { action } from '@ember/object';

export default class ApplicationRoute extends Route {
  // Defaults
  videoIsPlaying = false;
  removeAfterFrames = 100;
  markers = [];


  // Actions
  @action
  updateMarkers(newMarkers) {
    if(!this.videoIsPlaying) {
      newMarkers.forEach((newMarker) => {
        const newMarkerAlreadyExists = this.markers.find((marker) => {
          return newMarker.id == marker.id;
        });

        newMarker.removeIn = this.removeAfterFrames;

        if(!newMarkerAlreadyExists) {
          this.markers.push(newMarker);
        }
      });

      this.markers.forEach((marker, index, markers) => {
        const markerStillExists = newMarkers.find((newMarker) => {
          return newMarker.id == marker.id;
        });

        if(!markerStillExists) {
          if(marker.removeIn == 0) {
            markers.splice(index, 1);
            this.videoIsPlaying = true;
            this.transitionTo('drink', marker.id);
          } else {
            marker.removeIn--;
          }
        }
      });
    }
  }

  @action
  videoHasStopped() {
    this.videoIsPlaying = false;
    this.transitionTo('waiting');
  }
}
