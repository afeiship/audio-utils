export default class ProcessorRecorder {
  protected dataArray;

  constructor(public context) {
  }

  init() {
  }

  get() {
    this.dataArray = this.context.getPlayAnalyseData();
    const maxAmplitude = Math.max(...this.dataArray);
    const diff = maxAmplitude - 128;
    return diff / 128;
  }
}
