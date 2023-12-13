import Abstract from './abstract';

export default class ProcessorRecorder extends Abstract {
  get() {
    this.dataArray = this.context.getPlayAnalyseData();
    const maxAmplitude = Math.max(...this.dataArray);
    const diff = maxAmplitude - 128;
    return diff / 128;
  }
}
