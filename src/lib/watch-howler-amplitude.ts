import { Howler } from 'howler';

interface ChangeHandler {
  (amplitude: number): void;
}

interface WatchOptions {
  interval?: number;
}

const defaults: WatchOptions = {
  interval: 500,
};

function getAverageAmplitude(dataArray: Uint8Array) {
  var sum = dataArray.reduce(function (acc, val) {
    return acc + val;
  }, 0);
  return sum / dataArray.length / 100;
}

export default function watchHowlerAmplitude(
  inCallback: ChangeHandler,
  inOptions?: WatchOptions
) {
  const options = { ...defaults, ...inOptions };
  const audioContext = Howler.ctx;
  const analyser = audioContext.createAnalyser();
  Howler.masterGain.connect(analyser);

  const dataArray = new Uint8Array(analyser.frequencyBinCount);

  function calculate() {
    try {
      analyser.getByteFrequencyData(dataArray);
      const amplitude = getAverageAmplitude(dataArray);
      inCallback(amplitude);
    } catch (error) {
      console.warn('Buffer data get failed~');
    }
  }

  const timer = setInterval(calculate, options.interval);

  return {
    destroy() {
      inCallback(0);
      clearInterval(timer);
    },
  };
}
