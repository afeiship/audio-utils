/**
 * context: 是 audioElement
 */
const StdAudioContext = window.AudioContext || window.webkitAudioContext;


export default class ProcessorAudio {
  protected dataArray;
  protected analyser;

  constructor(public context) {
    this.dataArray = [];
  }

  init() {
    const audioContext = new StdAudioContext();
    this.analyser = audioContext.createAnalyser();
    const source = audioContext.createMediaElementSource(this.context);
    source.connect(this.analyser);
    this.analyser.connect(audioContext.destination);

    // 设置 AnalyserNode 的参数
    this.analyser.fftSize = 256; // 设置 FFT 大小
    const bufferLength = this.analyser.frequencyBinCount;
    this.dataArray = new Uint8Array(bufferLength);
  }

  get() {
    this.analyser.getByteFrequencyData(this.dataArray);
    const sum = this.dataArray.reduce(function(acc, val) {
      return acc + val;
    }, 0);
    return sum / this.dataArray.length / 100;
  }
}
