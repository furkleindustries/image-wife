import {
  getDelayConfusionFactor,
} from './getDelayConfusionFactor';
import {
  getDelayTime,
} from './getDelayTime';
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
  isFilterRoll,
} from './isFilterRoll';
import {
  isTransformRoll,
} from './isTransformRoll';
import {
  ImageWifeProps,
} from './ImageWifeProps';
import {
  isMetaRoll,
} from './isMetaRoll';
import {
  RollTypes,
} from './RollTypes';

import * as React from 'react';

export const ImageWife: React.FunctionComponent<ImageWifeProps> = ({
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

      const factor = getRollRandomConstMap()[arg as string];
      let random = Math.floor(Math.random() * factor);

      const isNegative = getRollRandomNegativeMap()[arg as string];
      random = isNegative && Math.random() < 0.5 ? -random : random;

      const expressionGenerator = getRollRandomStyleExpressionGeneratorMap()[arg as string];
      const generatedStyleExpression = expressionGenerator(random);

      if (isFilterRoll(arg)) {
        /* Throw if InvertHueRotateFilter is included in the stack with HueRotateFilter. */
        if (arg === RollTypes.InvertHueRotateFilter && args.includes(RollTypes.HueRotateFilter)) {
          throw new Error();
        }

        filter += generatedStyleExpression;
      } else if (isTransformRoll(arg)) {
        transform += generatedStyleExpression;
      } else {
        throw new Error('Unrecognized argument.');
      }
    }
  }

  const update = () => setTimeout(() => {
    setTick(tick + 1);    
  }, getDelayTime() * (1 - getDelayConfusionFactor() * Math.random()));

  requestAnimationFrame(update);

  return (
    <img
      className="wife"
      src={src}
      style={{
        filter,
        transform,
      }}
    />
  );
};
