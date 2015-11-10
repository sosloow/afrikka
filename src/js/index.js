import mapOfAfrika from './data/map.js';
import Region from './region.js';

let regions;

function init () {
  regions = mapOfAfrika.regions.map((data) => new Region(data));

  regions[0].attackNeighbor(regions[1]);
  console.log(regions);
}

init();
