import {
  CustomSvgFilter,
} from './CustomSvgFilter';
import {
  getConfusedDelayTime as getConfusedDelayTimeFunc,
} from './getConfusedDelayTime';
import {
  getCurrentMetaRollChance,
} from './getCurrentMetaRollChance';
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
  RollBaseTypes,
} from './RollBaseTypes';
import {
  RollTypes,
} from './RollTypes';
import {
  tickUpdate,
} from './tickUpdate';

import * as React from 'react';
import { getCurrentCustomSvgFilterId } from './getCurrentCustomSvgFilterId';

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
  tickUpdate,
}) => {
  let [ lastMetaTickValue, setLastMetaTickValue ] = React.useState(1);
  const [ tick, setTick ] = React.useState(0);

  let filter = '';
  let transform = '';
  let foundMetaRollThisRoll = false;
  let resetMetaRollEachTick = true;
  let currentMetaRollChance = lastMetaTickValue || 1;
  let foundMonochromeRollThisIteration = false;
  let foundNoiseRollThisRoll = false;
  const args: RollBaseTypes[] = Array.isArray(rolls) ? rolls : [ rolls ];
  for (const rawArg of args) {
    /**
     * Allow functional pseudo-rolls, which emit rolls. Otherwise, just use the plain roll.
     */
    let argsForThisIteration: RollBaseTypes | RollBaseTypes[] = rawArg;
    if (typeof argsForThisIteration === 'function') {
      argsForThisIteration = argsForThisIteration({
        /* Passed by value, so you can't screw up the loop. */
        args: [ ...args ],
        currentMetaRollChance,
        foundMetaRollThisRoll,
        resetMetaRollEachTick,
        lastMetaTickValue,
      });
    }

    let filteredThisIterArgs: RollBaseTypes[] = Array.isArray(argsForThisIteration) ?
      argsForThisIteration :
      [ argsForThisIteration ];

    /**
     * Null represents a no-op and is skipped entirely without output, roll,
     * or error. Only a single level of array nesting is allowed.
     */
    filteredThisIterArgs = filteredThisIterArgs
      .flat(1)
      .filter((aa: string | symbol) => aa !== null);

    /* Reset the sentinel value before iterating over the flat roll stack. */
    foundMetaRollThisRoll = false;

    for (const arg of filteredThisIterArgs) {
      /**
       * Any symbol represents a metaprogramming roll and aborts the iteration
       * early.
       */
      if (isMetaRoll(arg)) {
        /* This is the sentinel value for early meta roll aborts. */
        foundMetaRollThisRoll = true;

        const curChance = currentMetaRollChance;
        /* This will return curChance if arg is a reset meta roll. */
        currentMetaRollChance = getCurrentMetaRollChance(curChance, arg);

        if (arg === RollTypes.MetaRollDoResetEachTick) {
          resetMetaRollEachTick = true;
          setLastMetaTickValue(1);
        } else if (arg === RollTypes.MetaRollDontResetEachTick) {
          resetMetaRollEachTick = false;
          setLastMetaTickValue(currentMetaRollChance);
        }

        /**
         * If the roll is a meta roll, everything's already done by now.
         * Otherwise, style expression/SVG filter/noise image injection needs to
         * occur.
         */
        continue;
      }

      /**
       * If a random number in the [0, 1) range is greater than the current
       * meta roll chance (which basically acts as a high-pass filter here),
       * then the roll is discarded entirely, just as if it were a null roll,
       * or a meta roll, which has already been executed in full by now, and we
       * move on to the next roll.
       */
      if (Math.random() > currentMetaRollChance) {
        continue;
      }

      /**
       * Set the local variable to denote that a noise filter roll has been
       * found. Note that this encapsulates the roll state, not the iteration
       * state, so it is not reset as with thisIterationMonochromeRoll.
       */
      if (arg === RollTypes.NoiseFilter) {
        foundNoiseRollThisRoll = true;
      }

      /* Cast the argument to a string key. */
      const key = arg as string;

      /**
       * Get the [0, +inf] integer factor from the const map. 0 will always
       * result in a random value of 0, even if canBeNegative is true.
       */
      const factor = Math.abs(rollRandomConstMap[key]);
      let random = Math.floor(Math.random() * factor);

      /**
       * Results can only potentially be negative if the related boolean in the
       * negative map is true. After that, the random value must be positive or
       * +0 (not -0), after which a 50% random chance is performed to determine
       * whether the value is randomized or left unchanged. 
       */
      const canBeNegative = Boolean(random && rollRandomNegativeMap[key]);
      random = canBeNegative && Math.random() < 0.5 ? -random : random;

      /**
       * Set the monochrome random value for the iteration. This could be done
       * before the isNegative declaration, because it will always be false for
       * RollTypes.MonochromeFilter, but it matters little either way.
       */
      foundMonochromeRollThisIteration = arg === RollTypes.MonochromeFilter;

      /* Get the generator function from the expression generator map. */
      const expressionGenerator = rollRandomStyleExpressionGeneratorMap[key];

      if (isFilterRoll(arg)) {
        /**
         * NoiseFilter is handled through image injection and so is excluded.
         */
        if (arg !== RollTypes.NoiseFilter) {
          filter += expressionGenerator(random);
        }
      } else if (isTransformRoll(arg)) {
        transform += expressionGenerator(random);
      } else {
        throw new Error(
          `Unrecognized roll argument found in the roll stack: ${key}`,
        );
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

  const rawDelayTime = typeof delayTime === 'function' ?
    delayTime() :
    delayTime;

  const rawDelayConfusionPercentage = typeof delayTimeConfusionPercentage === 'function' ?
    delayTimeConfusionPercentage() :
    delayTimeConfusionPercentage;

  const realDelayTime = getConfusedDelayTime(
    rawDelayTime,
    rawDelayConfusionPercentage,
  );

  /* If the component has been ordered to refresh on a timer, set that last. */
  if (typeof tickUpdate === 'function') {
    tickUpdate(tick, setTick, realDelayTime);
  }

  return (
    <div
      className="imageWife"
      style={{ position: 'relative' }}
    >
      {foundNoiseRollThisRoll ?
        <Noiser
          imageUrls={imageUrls}
          imagesPreloadedPromise={noiseImagesPreloadedPromise}
          opacity={maxOpacity}
          filter={filterStyle}
        /> :
        null}

      {foundMonochromeRollThisIteration ?
        <CustomSvgFilter
          filterId={getCurrentCustomSvgFilterId()}
          type={RollTypes.MonochromeFilter}
        /> : 
        null}

      <img
        className="imageWife-image"
        src={src}
        style={imgStyle}
      />
    </div>
  );
};
