/**
 * import { Howler } from 'howler';
 * context: 是这个 Howler
 */

import Abstract from './abstract';

export default class ProcessorHowler extends Abstract {
  init() {
    const audioContext = this.context.ctx;
    this.analyser = audioContext.createAnalyser();
    this.context.masterGain.connect(this.analyser);

    // 设置 AnalyserNode 的参数
    this.analyser.fftSize = 256; // 设置 FFT 大小
    const bufferLength = this.analyser.frequencyBinCount;
    this.dataArray = new Uint8Array(bufferLength);
  }
}
