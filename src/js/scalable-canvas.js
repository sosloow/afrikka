import {fabric} from 'fabric';

class ScalableCanvas extends fabric.Canvas {
  constructor(...args) {
    super(...args);

    this.selection = false;
    this.zoom = 1;
    this.zoomStep = 0.5;
    this.zoomMin = 0.5;
    this.zoomMax = 3;

    this.initHandlers();
    this.resize();
  }

  resize() {
    this.setHeight(document.documentElement.clientHeight - 25);
    this.setWidth(document.documentElement.clientWidth - 15);
  }

  rescale(newZoom) {
    let ratio = this.zoom / newZoom;
    for(let object of this.getObjects()) {
      object.scaleX = object.scaleX / ratio;
      object.scaleY = object.scaleY / ratio;
      object.initialCoords[0] = object.left = object.left / ratio;
      object.initialCoords[1] = object.top = object.top / ratio;

      object.setCoords();
    }

    this.zoom = newZoom;

    this.renderAll();
    this.calcOffset();
  }

  startDragging(x, y) {
    this.dragging = true;
    this.dragStart = [x, y];
  }

  moveObjects(x, y) {
    for(let object of this.getObjects()) {
      object.top = object.initialCoords[1] - this.dragStart[1] + y;
      object.left = object.initialCoords[0] - this.dragStart[0] + x;

      object.setCoords();
    }

    this.renderAll();
    this.calcOffset();
  }

  settleObjects(x, y) {
    for(let object of this.getObjects()) {
      object.initialCoords[1] = object.initialCoords[1] - this.dragStart[1] + y;
      object.initialCoords[0] = object.initialCoords[0] - this.dragStart[0] + x;
    }
  }

  zoomIn() {
    if (this.zoom < this.zoomMax) {
      this.rescale(this.zoom + this.zoomStep);
    }
  }

  zoomOut() {
    if (this.zoom > this.zoomMin) {
      this.rescale(this.zoom - this.zoomStep);
    }
  }

  initHandlers() {
    window.addEventListener('resize', () => {
      this.resize();
    });

    this.on('mouse:over', (options) => {
      if (typeof options.target.onMouseOut != 'function') {
        return;
      }

      options.target.onMouseIn();
      this.renderAll();
    });

    this.on('mouse:out', (options) => {
      if (typeof options.target.onMouseOut != 'function') {
        return;
      }

      options.target.onMouseOut();
      this.renderAll();
    });

    this.on('mouse:down', (options) => {
      this.startDragging(options.e.clientX, options.e.clientY);

      if (options.target && typeof options.target.onClick == 'function') {
        for(let object of this.getObjects()) {
          if (typeof options.target.deselect == 'function') {
            object.deselect();
          }
        }

        options.target.onClick();
      }
    });

    this.on('mouse:up', (options) => {
      this.dragging = false;
      this.settleObjects(options.e.clientX, options.e.clientY);
    });

    this.on('mouse:move', (options) => {
      if (!this.dragging) { return; }

      this.moveObjects(options.e.clientX, options.e.clientY);
    });
  }
}

export default ScalableCanvas;
