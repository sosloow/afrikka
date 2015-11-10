class Region {
  constructor(data) {
    this.connect = data.connect;
    this.agi = data.agi;
    this.id = data.id;
  }

  attackNeighbor(neighbor) {
    this.agi += 10;
    neighbor.agi -= 10;
  }
}

export default Region;
