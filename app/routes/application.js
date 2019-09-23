import Route from '@ember/routing/route';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class ApplicationRoute extends Route {
  // Service
  @service router;
  @service debug;
  @service flashMessages;
  @service videos;

  // Defaults
  videoIsPlaying = false;
  removeAfterFrames = 10;
  markers = [];


  // Hooks
  afterModel() {
    // Preload videos
    return this.store
      .findAll('scene')
      .then((scenes) => {
        scenes.forEach((scene) => {
          if (scene.intro) this.videos.loadSrc(scene.intro);
          if (scene.loop) this.videos.loadSrc(scene.loop);
        });

        return this.store
          .findAll('drink')
          .then((drinks) => {
            drinks.forEach((drink) => {
              if (drink.intro) this.videos.loadSrc(drink.intro);
              if (drink.ex) this.videos.loadSrc(drink.ex);
            });
          });
      });
  }


  // Actions
  @action
  updateMarkers(newMarkers) {
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

          // Transition to drink
          this.transitionToDrink(marker.id);
        } else {
          marker.removeIn--;
        }
      }
    });
  }

  @action
  transitionToDrink(markerId) {
    if(this.videoIsPlaying) {
      // If one video is playing show message
      this.flashMessages.warning('Ein Drink nach dem anderen!');
    } else {
      const scene = this.modelFor('scene');

      scene.drinks.then((drinks) => {
        let mapMarkerToDrink = {
          0: "Vodka",
          6: "Berliner Luft",
          9: "Jägermeister"
        }
        let drink = drinks.findBy('name', mapMarkerToDrink[markerId]);

        if(drink.intro) {
          this.transitionTo('scene.drink.intro', drink);
        } else {
          this.transitionTo('scene.drink.ex', drink);
        }

        // Set videoIsPlaying to true
        this.videoIsPlaying = true;

        // Increase drink Count
        this.debug.drinkCount++;
      });
    }
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
