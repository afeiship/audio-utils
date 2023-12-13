export default abstract class {
  protected dataArray;
  protected analyser;

  constructor(public context) {
    this.dataArray = [];
  }

  init() {
  }

  get() {
    this.analyser.getByteFrequencyData(this.dataArray);
    const sum = this.dataArray.reduce(function(acc, val) {
      return acc + val;
    }, 0);
    return sum / this.dataArray.length / 100;
  }
}
