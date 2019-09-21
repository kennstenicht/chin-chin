import Route from '@ember/routing/route';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class ApplicationRoute extends Route {
  // Service
  @service router;
  @service debug;


  // Defaults
  videoIsPlaying = false;
  removeAfterFrames = 10;
  markers = [];


  // Hooks
  afterModel() {
    return this.transitionToRandomScene();
  }


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
            // Remove marker from aktive markers
            markers.splice(index, 1);

            // Set videoIsPlaying to true
            this.videoIsPlaying = true;

            // Transition to drink
            this.transitionToDrink(marker.id)
          } else {
            marker.removeIn--;
          }
        }
      });
    }
  }

  @action
  transitionToDrink(markerId) {
    const scene = this.modelFor(this.router.currentRouteName);

    scene.drinks.then((drinks) => {
      let mapMarkerToDrink = {
        6: "Vodka",
        9: "Berliner Luft",
        3: "Jägermeister"
      }
      let drink = drinks.findBy('name', mapMarkerToDrink[markerId]);

      if(drink.intro) {
        this.transitionTo('scene.drink.intro', drink);
      } else {
        this.transitionTo('scene.drink.ex', drink);
      }

      this.debug.drinkCount++;
    });
  }

  @action
  transitionToRandomScene() {
    // Video is finised; New marker updates are allowed
    this.videoIsPlaying = false;

    // Transition to new random scene of current state
    let scenes = this._getScenes();

    scenes.then((scenes) => {
      const randomScene = Math.floor(Math.random() * scenes.length);
      const scene = scenes.objectAt(randomScene);

      if(scene.intro) {
        this.transitionTo('scene.intro', scene);
      } else {
        this.transitionTo('scene.loop', scene);
      }
    });
  }

  _getScenes() {
    return this.store.findAll('scene');
  }
}
