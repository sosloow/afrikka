import Region from '../src/js/region';
import mapOfAfrica from './fixtures/map';

describe('Region', () => {
  let regions;

  beforeEach(() => {
    regions = mapOfAfrica.regions.map((data) => new Region(data));
  });

  afterEach(() => {

  });

  describe('attackNeighbor', () => {
    it('changes agi of defender and attacker', () => {
      regions[0].attackNeighbor(regions[1]);

      expect(regions[0].agi).to.equal(40);
    });
  });
});
