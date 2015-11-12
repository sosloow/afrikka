import Renderer from './renderer';
import App from './display-objects/app';
import Region from './region';
import {Texture} from 'pixi.js';

const renderer = new Renderer(800, 600);
const app = new App(800, 600);

document.body.appendChild(renderer.view);

renderer.addRenderable(app);

renderer.start();









