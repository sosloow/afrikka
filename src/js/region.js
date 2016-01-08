import {fabric} from 'fabric';

const defaults = {
  fill: '#eee',
  fillHover: '#ddd',
  fillSelected: '#aaa',
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

    this.initialCoords = [this.left, this.top];
    this.connect = options.connect || [];
    this.agi = options.agi || 0;
    this.id = options.id || '';
  }

  attackNeighbor(neighbor) {
    this.agi += 10;
    neighbor.agi -= 10;
  }

  repaint() {
    if (this.isSelected) {
      this.setFill(defaults.fillSelected);
    } else if (this.isHovered) {
      this.setFill(defaults.fillHover);
      this.setStroke(defaults.strokeHover);
    } else {
      this.setFill(defaults.fill);
      this.setStroke(defaults.stroke);
    }
  }

  onMouseIn() {
    this.isHovered = true;

    this.repaint();
  }

  onMouseOut() {
    this.isHovered = false;

    this.repaint();
  }

  deselect() {
    this.isSelected = false;

    this.repaint();
  }

  onClick() {
    this.isSelected = true;

    this.repaint();
  }
}

export default Region;
