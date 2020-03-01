import {
  FunctionalPseudoRollType,
} from './FunctionalPseudoRollType';
import {
  imageFilepaths,
} from './imageFilepaths';
import {
  ImageWife,
} from './ImageWife';
import {
  RollStackType,
} from './RollStackType';
import {
  RollTypes,
} from './RollTypes';
import {
  tickUpdate,
} from './tickUpdate';

import * as React from 'react';
import * as ReactDOM from 'react-dom';

/**
 * Sample usage. Do not require this file or call this function if you don't
 * want the sample output.
 */
export const init = () => {
  const rolls: RollStackType = [
    RollTypes.MetaRollQuarterChance,
    RollTypes.BrightnessFilter,
    RollTypes.ContrastFilter,

    (() => (
      Math.random() > 0.3 ?
        RollTypes.HueRotateFilter :
        RollTypes.InvertHueRotateFilter
    )) as FunctionalPseudoRollType,
    
    (() => (
      Math.random() > 0.3 ?
        RollTypes.NoiseFilter :
        null
    )) as FunctionalPseudoRollType,

    (() => (
      Math.random() > 0.3 ?
        RollTypes.SaturateFilter :
        RollTypes.MonochromeFilter
    )) as FunctionalPseudoRollType,

    RollTypes.SepiaFilter,
    RollTypes.MetaRollFiftiethChance,
    RollTypes.ReflectTransform,
    RollTypes.RotateTransform,
  ];

  const loadedPromise = Promise.all(imageFilepaths.map((url: string) => (
    new Promise<void>((resolve, reject) => {
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
          tickUpdate={tickUpdate}
        />
      ))}
    </div>,
    document.getElementById('root'),
  );
};

if (typeof window !== 'undefined') {
  (window as any).init = init;
}
