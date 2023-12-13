interface ChangeHandler {
  (amplitude: number): void;
}

interface WatchOptions {
  interval?: number;
}

const defaults: WatchOptions = {
  interval: 500,
};

export default function watchAmplitude(
  inBufferGetter: any,
  onChange: ChangeHandler,
  inOptions?: WatchOptions
) {
  const options = { ...defaults, ...inOptions };
  function calculate() {
    try {
      const dataArray = inBufferGetter();
      const maxAmplitude = Math.max(...dataArray);
      const diff = maxAmplitude - 128;
      const amplitude = diff / 128;
      onChange(amplitude);
    } catch (error) {
      console.warn('Buffer data get failed~');
    }
  }

  const timer = setInterval(calculate, options.interval);

  return {
    destroy() {
      onChange(0);
      clearInterval(timer);
    },
  };
}
