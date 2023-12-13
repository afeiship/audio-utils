# audio-utils
> Audio utils.

[![version][version-image]][version-url]
[![license][license-image]][license-url]
[![size][size-image]][size-url]
[![download][download-image]][download-url]

## installation
```shell
yarn add @jswork/audio-utils
```

## usage
```js
import { checkPermission, watchAmplitude } from '@jswork/audio-utils';

// checkPermission
checkPermission().then((res) => {
  console.log(res);
});

// watchAmplitude when recorder
useEffect(() => {
  if (!isPlaying) return;
  const res = watchAmplitude({
    type: 'recorder',
    context: recorder,
    callback: (v) => {
      console.log('volumn: ', v);
    },
  });
  return res.destroy;
}, [isPlaying]);

// watchAmplitude when howler
useEffect(() => {
  if (!isPlaying) return;
  const res = watchAmplitude({
    type: 'howler',
    context: Howler,
    callback: (v) => {
      console.log('volumn: ', v);
    },
  });
  return res.destroy;
}, [isPlaying]);

// watchAmplitude when audio
useEffect(() => {
  if (!isPlaying) return;
  const res = watchAmplitude({
    type: 'audio',
    context: document.querySelector('#audio1'),
    callback: (v) => {
      console.log('volumn: ', v);
    },
  });
  return res.destroy;
}, [isPlaying]);

```

## types
```ts
/// <reference types="@jswork/audio-utils/global.d.ts" />
```

## license
Code released under [the MIT license](https://github.com/afeiship/audio-utils/blob/master/LICENSE.txt).

[version-image]: https://img.shields.io/npm/v/@jswork/audio-utils
[version-url]: https://npmjs.org/package/@jswork/audio-utils

[license-image]: https://img.shields.io/npm/l/@jswork/audio-utils
[license-url]: https://github.com/afeiship/audio-utils/blob/master/LICENSE.txt

[size-image]: https://img.shields.io/bundlephobia/minzip/@jswork/audio-utils
[size-url]: https://github.com/afeiship/audio-utils/blob/master/dist/index.min.js

[download-image]: https://img.shields.io/npm/dm/@jswork/audio-utils
[download-url]: https://www.npmjs.com/package/@jswork/audio-utils
