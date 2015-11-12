import ScaledContainer from './scaled-container';
import Background from './background';

export default class App extends ScaledContainer {

  constructor(...args) {
    var bg = new Background();

    super(...args);

    this.addChild(bg);

  }

}
