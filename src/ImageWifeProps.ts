import {
  isFilterRoll,
} from './isFilterRoll';
import {
  isMetaRoll,
} from './isMetaRoll';
import {
  isTransformRoll,
} from './isTransformRoll';
import {
  MutationRollType,
} from './MutationRollType';
import {
  RollStackType,
} from './RollStackType';

export interface ImageWifeProps {
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
  readonly rolls: RollStackType | MutationRollType;
  readonly src: string;
  readonly tickUpdate?: (
    tick: number,
    setTick: (val: number) => void,
    realDelayTime: number,
  ) => void;
}
