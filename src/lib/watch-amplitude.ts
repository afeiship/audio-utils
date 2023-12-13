interface WatchOptions {
  context?: any;
  type?: 'recorder' | 'howler';
  interval?: number;

  callback: (amplitude: number) => void;
}

const defaults: WatchOptions = {
  context: null,
  type: 'recorder',
  interval: 500,
  callback: (_) => {
  },
};

class ProcessorRecorder {
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

class ProcessorHowler {
  protected dataArray;
  protected analyser;

  constructor(public context) {
    this.dataArray = [];
  }

  init() {
    const audioContext = this.context.ctx;
    this.analyser = audioContext.createAnalyser();
    this.context.masterGain.connect(this.analyser);
    this.dataArray = new Uint8Array(this.analyser.frequencyBinCount);
  }

  get() {
    this.analyser.getByteFrequencyData(this.dataArray);
    const sum = this.dataArray.reduce(function(acc, val) {
      return acc + val;
    }, 0);
    return sum / this.dataArray.length / 100;
  }
}

export default function watchAmplitude(inOptions?: WatchOptions) {
  const options = { ...defaults, ...inOptions };
  const { type } = options;
  const Processor = type === 'recorder' ? ProcessorRecorder : ProcessorHowler;
  const processor = new Processor(options.context);

  processor.init();

  function calculate() {
    try {
      const amplitude = processor.get();
      options.callback(amplitude);
    } catch (error) {
      console.warn('Buffer data get failed~');
    }
  }

  const timer = setInterval(calculate, options.interval);

  return {
    destroy() {
      options.callback(0);
      clearInterval(timer);
    },
  };
}
