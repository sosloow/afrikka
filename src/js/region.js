import {fabric} from 'fabric';

const defaults = {
  fill: '#eee',
  fillHover: '#aaa',
  stroke: 'green',
  strokeHover: 'green'
};

class Region extends fabric.Path {
  constructor(options) {
    super(options.d, {
      fill: defaults.fill,
      stroke: defaults.stroke,
      selectable: false,
      perPixelTargetFind: true
    });

    this.connect = options.connect || [];
    this.agi = options.agi || 0;
    this.id = options.id || '';
  }

  attackNeighbor(neighbor) {
    this.agi += 10;
    neighbor.agi -= 10;
  }

  onMouseIn() {
    this.setFill(defaults.fillHover);
    this.setStroke(defaults.strokeHover);
  }

  onMouseOut() {
    this.setFill(defaults.fill);
    this.setStroke(defaults.strokeHover);
  }
}

export default Region;
