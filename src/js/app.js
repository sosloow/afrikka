import Session from './stores/session';
import Region from './region';
import ScalableCanvas from './scalable-canvas';
import countries from './constants/map';
import Sidebar from './sidebar';

class App {
  constructor() {
    this.session = new Session();
    this.canvas = new ScalableCanvas('appCanvas');
    this.regions = countries.map((country) => new Region(country));
  }

  start() {
    this.regions.forEach((region) => this.canvas.add(region));
    this.initHandlers();
  }

  initHandlers() {
    Sidebar.setZoomInHandler(() => {
      this.canvas.zoomIn();
    });


    Sidebar.setZoomOutHandler(() => {
      this.canvas.zoomOut();
    });
  }
}

export default App;
