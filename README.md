## Introduction

A library for compile-time and runtime procedural modification of photographic images. This library works best when used to make very minimal, occasional modifications to one or more abstract photographs with similar compositions. It can be used to randomize many aspects of photo display on the web, but to an extent it's already fairly easy to do that with CSS. This is a library for producing near-limitless numbers of uncanny similarities to one or more source images. Note that, because of including a large number of images, this library is approximately 22MB in size, and may take longer than expected to install.

## Installation

Install the package through npm with `npm install --save image-wife`. The codebase is written in TypeScript, built to browser-compatible JavaScript, and includes source maps and declaration files. In addition to the codebase, which is quite small, the library also includes 70 images of various size (all <2MB) used for display and animation of simplex noise. There are also base64-encoded .txt files of the same. None of these are included in exports, and will have to be referenced directly through imports/requires or direct `<img>` access.

## Usage

The important export from this library is the `<ImageWife />` component, which exposes the following prop signature:

```tsx
interface ImageWifeProps {
  readonly delayTime?: number | ((...args: any[]) => number);
  readonly delayTimeConfusionPercentage?: number | ((...args: any[]) => number);
  readonly getConfusedDelayTime?: (delay: number, confusion: number) => number;
  readonly rollRandomStyleExpressionGeneratorMap?: Record<string, (...args: any[]) => string>;
  readonly isFilterRoll?: typeof isFilterRoll;
  readonly isMetaRoll?: typeof isMetaRoll;
  readonly isTransformRoll?: typeof isTransformRoll;
  readonly maxBlur?: number;
  readonly maxOpacity?: number;
  readonly maxSaturation?: number;
  readonly noiseImagesPreloadedPromise?: Promise<any>;
  readonly noiseImageUrls?: string | string[];
  readonly rollRandomConstMap?: Record<string, number>;
  readonly rollRandomNegativeMap?: Record<string, boolean>;
  readonly rolls: RollBaseTypes | RollBaseTypes[];
  readonly src: string;
}

type RollBaseTypes =
  string |
  symbol |
  Array<string | symbol> |
  ((...any: any[]) => string | symbol | Array<string | symbol> | null) |
  null;
```

The available roll types, including output-facing rolls and meta rolls, are as follows:

```tsx
const RollTypes = {
  BrightnessFilter: 'BrightnessFilter',
  ContrastFilter: 'ContrastFilter',
  HueRotateFilter: 'HueRotateFilter',
  InvertHueRotateFilter: 'InvertHueRotateFilter',
  NoiseFilter: 'NoiseFilter',
  ReflectTransform: 'ReflectTransform',
  RotateTransform: 'RotateTransform',
  SaturateFilter: 'SaturateFilter',
  SepiaFilter: 'SepiaFilter',
  MetaRollHalfChance: (unique symbol),
  MetaRollQuarterChance: (unique symbol),
  MetaRollTenthChance: (unique symbol),
  MetaRollFiftiethChance: (unique symbol),
  MetaRollHundredthChance: (unique symbol),
  MetaRollDoResetEachTick: (unique symbol),
  MetaRollDontResetEachTick: (unique symbol),
};
```

Each of the symbols is available as an export in the `src/MetaRolls.ts` file. Further, rolls may be functions which emit rolls when called, and so further customization or randomization of the roll stack is available. Note that some combinations are disallowed, for example combining `HueRotateFilter` and `InvertHueRotateFilter`, and attempting to use `NoiseFilter` without having provided any URLs in `noiseImageUrls`.

## Sample usage

```tsx
const rolls = [
  RollTypes.MetaRollQuarterChance,
  RollTypes.BrightnessFilter,
  RollTypes.ContrastFilter,

  () => (
    Math.random() > 0.3 ?
      RollTypes.HueRotateFilter :
      RollTypes.InvertHueRotateFilter
  ),

  RollTypes.SaturateFilter,
  RollTypes.SepiaFilter,
  RollTypes.MetaRollFiftiethChance,
  RollTypes.ReflectTransform,
  RollTypes.RotateTransform,
];

const loadedPromise = Promise.all(imageFilepaths.map((url: string) => (
  new Promise<any>((resolve, reject) => {
    const img = new Image();

    // https://github.com/sindresorhus/slash/blob/master/index.js
    const isExtendedLengthPath = /^\\\\\?\\/.test(url);
    const hasNonAscii = /[^\u0000-\u0080]+/.test(url);
    const formattedUrl = isExtendedLengthPath || hasNonAscii ?
      url :
      url.replace(/\\/g, '/');

    img.src = formattedUrl;
    img.addEventListener('load', () => resolve());
    img.addEventListener('error', (e) => reject(e.error));
  })
)));

const sources = [
  'https://media.discordapp.net/attachments/635344640769261568/678729526217408582/20200216_172804.jpg?width=1191&height=1198',
  'https://media.discordapp.net/attachments/635344640769261568/678730679156080650/20200216_173301.jpg?width=1173&height=1196',
  'https://media.discordapp.net/attachments/628925396108443648/678754090997776417/20200216_190539.jpg?width=1197&height=1197',
  'https://media.discordapp.net/attachments/628925396108443648/678754302604345344/20200215_151225.jpg?width=1197&height=1197',
  'https://media.discordapp.net/attachments/628925396108443648/678754456396890112/20200215_111702.jpg?width=1197&height=1197',
  'https://media.discordapp.net/attachments/628925396108443648/678755356968615966/20200216_191104.jpg?width=1164&height=1198',
  'https://media.discordapp.net/attachments/628925396108443648/678756320215695390/20200216_191429.jpg?width=1197&height=1197',
  'https://media.discordapp.net/attachments/628925396108443648/678757740381863938/20200216_192036.jpg?width=1197&height=1197',
  'https://media.discordapp.net/attachments/628925396108443648/646509966311555083/20191119_184328.jpg?width=1197&height=1197',
];

ReactDOM.render(
  <div className="wives">
    {sources.map((src, key) => (
      <ImageWife
        noiseImageUrls={imageFilepaths}
        key={key}
        noiseImagesPreloadedPromise={loadedPromise}
        rolls={rolls}
        src={src}
      />
    ))}
  </div>,
  document.getElementById('root'),
);
```

This code is contained in `src/init.tsx` and can be used by calling the `init` export.
