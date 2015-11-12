import PIXI from 'pixi.js';

/**
 * Loads the adds the diagnostic image
 *
 * @exports Background
 * @extends Container
 */
export default class Background extends PIXI.Container {
  constructor() {
    super();

    var bg = PIXI.Sprite.fromImage('assets/diagnostic.png');

    this.addChild(bg);
  }
}
