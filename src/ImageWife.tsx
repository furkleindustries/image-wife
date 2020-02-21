import {
  getConfusedDelayTime as getConfusedDelayTimeFunc,
} from './getConfusedDelayTime';
import {
  getRollRandomConstMap,
} from './getRollRandomConstMap';
import {
  getRollRandomNegativeMap,
} from './getRollRandomNegativeMap';
import {
  getRollRandomStyleExpressionGeneratorMap,
} from './getRollRandomStyleExpression';
import {
  ImageWifeProps,
} from './ImageWifeProps';
import {
  isFilterRoll as isFilterRollFunc,
} from './isFilterRoll';
import {
  isMetaRoll as isMetaRollFunc,
} from './isMetaRoll';
import {
  isTransformRoll as isTransformRollFunc,
} from './isTransformRoll';
import {
  Noiser,
} from './Noiser';
import {
  RollTypes,
} from './RollTypes';

import * as React from 'react';

export const ImageWife: React.FunctionComponent<ImageWifeProps> = ({
  delayTime = 8,
  delayTimeConfusionPercentage = 0.2,
  getConfusedDelayTime = getConfusedDelayTimeFunc,
  rollRandomStyleExpressionGeneratorMap = getRollRandomStyleExpressionGeneratorMap(),
  isFilterRoll = isFilterRollFunc,
  isMetaRoll = isMetaRollFunc,
  isTransformRoll = isTransformRollFunc,
  rollRandomConstMap = getRollRandomConstMap(),
  rollRandomNegativeMap = getRollRandomNegativeMap(),
  maxBlur = Math.random() * 0.4,
  maxOpacity = Math.random() * 0.4,
  maxSaturation = Math.random() * 0.4,
  noiseImageUrls,
  noiseImagesPreloadedPromise = Promise.resolve(),
  rolls,
  src,
}) => {
  let [ lastMetaTickValue, setLastMetaTickValue ] = React.useState(1);
  const [ tick, setTick ] = React.useState(0);

  let filter = '';
  let transform = '';
  let foundMetaRollThisRoll = false;
  let resetMetaRollEachTick = true;
  let currentMetaRollChance = lastMetaTickValue || 1;
  const args = Array.isArray(rolls) ? rolls : [ rolls ];
  for (const rawArg of args) {
    /**
     * Allow functional pseudo-rolls, which emit rolls. Otherwise, just use the plain roll.
     */
    let argsForIteration = rawArg as Array<string | symbol>;
    if (typeof argsForIteration === 'function') {
      argsForIteration = (argsForIteration as Function)({
        /* Passed by value, so you can't screw up the loop. */
        args: [ ...args ],
        currentMetaRollChance,
        foundMetaRollThisRoll,
        resetMetaRollEachTick,
        lastMetaTickValue,
      });
    }

    argsForIteration = Array.isArray(argsForIteration) ?
      argsForIteration :
      [ argsForIteration ];

    argsForIteration = (argsForIteration as any).flat();

    for (const arg of argsForIteration) {
      /**
       * Any symbol represents a metaprogramming roll and aborts the iteration early.
       */
      if (isMetaRoll(arg)) {
        foundMetaRollThisRoll = true;

        if (arg === RollTypes.MetaRollHalfChance) {
          currentMetaRollChance = 0.5;
        } else if (arg === RollTypes.MetaRollQuarterChance) {
          currentMetaRollChance = 0.25;
        } else if (arg === RollTypes.MetaRollTenthChance) {
          currentMetaRollChance = 0.1;
        } else if (arg === RollTypes.MetaRollFiftiethChance) {
          currentMetaRollChance = 0.025;
        } else if (arg === RollTypes.MetaRollHundredthChance) {
          currentMetaRollChance = 0.01;
        } else if (arg === RollTypes.MetaRollDoResetEachTick) {
          resetMetaRollEachTick = true;
          setLastMetaTickValue(1);
        } else if (arg === RollTypes.MetaRollDontResetEachTick) {
          resetMetaRollEachTick = false;
          setLastMetaTickValue(currentMetaRollChance);
        }
      }

      if (foundMetaRollThisRoll) {
        foundMetaRollThisRoll = false;
        continue;
      }

      if (Math.random() > currentMetaRollChance) {
        continue;
      }

      const factor = rollRandomConstMap[arg as string];
      let random = Math.floor(Math.random() * factor);

      const isNegative = rollRandomNegativeMap[arg as string];
      random = isNegative && Math.random() < 0.5 ? -random : random;

      const expressionGenerator = rollRandomStyleExpressionGeneratorMap[arg as string];
      const generatedStyleExpression = expressionGenerator(random);

      if (isFilterRoll(arg)) {
        /* Throw if InvertHueRotateFilter is included in the stack with HueRotateFilter. */
        if (arg === RollTypes.InvertHueRotateFilter && args.includes(RollTypes.HueRotateFilter)) {
          throw new Error('Cannot combine InvertHueRotateFilter and HueRotateFilter.');
        }

        filter += generatedStyleExpression;
      } else if (isTransformRoll(arg)) {
        transform += generatedStyleExpression;
      } else {
        throw new Error('Unrecognized roll argument found in the roll stack.');
      }
    }
  }

  let imageUrls: string[] = [];
  if (noiseImageUrls) {
    if (typeof noiseImageUrls === 'string') {
      imageUrls = [ noiseImageUrls ];
    } else {
      imageUrls = noiseImageUrls;
    }
  }

  const filterStyle = {
    blur: maxBlur,
    saturation: maxSaturation,
  };

  const imgStyle = {
    filter,
    transform,
    width: '100%',
    height: '100%',
  };

  const rawDelayTime = typeof delayTime === 'function' ? delayTime() : delayTime;
  const rawDelayConfusionPercentage = typeof delayTimeConfusionPercentage === 'function' ?
    delayTimeConfusionPercentage() :
    delayTimeConfusionPercentage;

  const realDelayTime = getConfusedDelayTime(
    rawDelayTime,
    rawDelayConfusionPercentage,
  );

  const update = () => setTimeout(() => setTick(tick + 1), realDelayTime);

  requestAnimationFrame(update);

  return (
    <div
      className="imageWife"
      style={{ position: 'relative' }}
    >
      <Noiser
        imageUrls={imageUrls}
        imagesPreloadedPromise={noiseImagesPreloadedPromise}
        opacity={maxOpacity}
        filter={filterStyle}
      />

      <img
        className="imageWife-image"
        src={src}
        style={imgStyle}
      />
    </div>
  );
};
