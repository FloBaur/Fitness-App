class MODEL_Star {
  constructor(id, type, timestamp) {
    this.id = Math.floor(Math.random() * 1000);
    this.type = type;
    this.timestamp = timestamp;
  }
}
export default MODEL_Star;
