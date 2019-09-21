import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import { AR } from 'js-aruco';

export default class TrackerComponent extends Component {
  // Services
  @service debug;


  // Defaults
  block = 'c-tracker';
  video = null;
  @tracked contrast = 2000;
  @tracked grayscale = 100;
  @tracked brightness = 100;

  // Hooks
  constructor() {
    super(...arguments);

    this.detector = new AR.Detector();
  }


  // Functions
  renderCameraImage(video) {
    video.style.display = "none";

    // Select video source
    // https://webrtc.github.io/samples/src/content/devices/input-output/
    if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then(function(stream) {
          video.srcObject = stream;
          video.play();
        });
    }

    this.video = video;
  }

  renderCanvas(canvas) {
    canvas.width = this.video.width;
    canvas.height = this.video.height;

    this.context = canvas.getContext("2d");

    requestAnimationFrame(this.tick.bind(this));
  }

  tick() {
    let imageData = this._snapshot();
    let markers = this.detector.detect(imageData);

    if(markers.length ) {
      this._drawCorners(markers);
    }

    this.args.updateMarkers(markers);

    requestAnimationFrame(this.tick.bind(this));
  }

  _snapshot() {
    // Draw current webcame frame
    this.context.filter = `
      contrast(${this.contrast}%)
      grayscale(${this.grayscale}%)
      brightness(${this.brightness}%)
    `;
    this.context.drawImage(
      this.video,
      0,
      0,
      this.video.width,
      this.video.height
    );


    // Return image data
    return this.context.getImageData(
      0,
      0,
      this.video.width,
      this.video.height
    );
  }

  _drawCorners(markers){
    this.context.filter = 'contrast(100%) grayscale(0%)';

    markers.forEach((marker) => {
      let corners = marker.corners

      // Draw border arround marker
      this.context.lineWidth = 3;
      this.context.strokeStyle = "red";
      this.context.beginPath();

      corners.forEach((corner) => {
        this.context.lineTo(corner.x, corner.y);
      });

      this.context.closePath();
      this.context.stroke();

      // Draw marker ID
      this.context.lineWidth = 1;
      this.context.strokeStyle = "blue";
      this.context.strokeText(marker.id, corners[0].x -2 , corners[0].y - 2)
    })
  }
}
