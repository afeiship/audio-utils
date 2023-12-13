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
  inArrayBuffer: any,
  onChange: ChangeHandler,
  inOptions?: WatchOptions
) {
  const options = { ...defaults, ...inOptions };

  function calculate() {
    const maxAmplitude = Math.max(...inArrayBuffer);
    const diff = maxAmplitude - 128;
    const amplitude = diff / 128;
    onChange(amplitude);
  }

  const timer = setInterval(calculate, options.interval);

  return {
    destroy() {
      onChange(0);
      clearInterval(timer);
    },
  };
}
