import Service from '@ember/service';
import fetch from 'fetch';


export default class VideosService extends Service {
  // Cache
  videos = {};

  setSrc(srcPath, callback) {
    if (!srcPath) {
      return;
    }

    let videos = this.videos;
    if (videos[srcPath]) {
      console.log(`Cache: Hit for ${srcPath}`);
      callback(videos[srcPath]);
      return;
    }

    console.log(`Cache: Missed for ${srcPath}`);
    this.loadSrc(srcPath, callback);

  }

  loadSrc(srcPath, callback = () => {}) {
    let videos = this.videos;

    var req = new XMLHttpRequest();
    req.open('GET', srcPath, true);
    req.responseType = 'arraybuffer';
    req.onload = function() {
      if (this.status === 200) {
        console.log(`Cache: Create for ${srcPath}`);
        let objectURL = URL.createObjectURL(new Blob([this.response]));
         videos[srcPath] = objectURL;
         callback(objectURL);
      }
    }
    req.onerror = console.log
    req.send();
  }
}
