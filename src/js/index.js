import Region from './region';
import countries from './constants/map';
import {fabric} from 'fabric';

let {Canvas} = fabric;

let canvas = new Canvas('appCanvas', {
  height: 1500,
  width: 1300,
  selection: false
});

canvas.on('mouse:over', function(e) {
  if (typeof e.target.onMouseOut != 'function') {
    return;
  }

  e.target.onMouseIn();
  canvas.renderAll();
});


canvas.on('mouse:out', function(e) {
  if (typeof e.target.onMouseOut != 'function') {
    return;
  }

  e.target.onMouseOut();
  canvas.renderAll();
});

let regions = countries.map((country) => new Region(country));

regions.forEach ((region) => canvas.add(region));
