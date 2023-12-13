import ProcessorRecorder from './processors/recorder';
import ProcessorHowler from './processors/howler';

const processors = {
  'recorder': ProcessorRecorder,
  'howler': ProcessorHowler,
};

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


export default function watchAmplitude(inOptions?: WatchOptions) {
  const options = { ...defaults, ...inOptions };
  const { type } = options;
  const Processor = processors[type!];
  if (!Processor) throw new Error(`Processor ${type} not found!`);
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
