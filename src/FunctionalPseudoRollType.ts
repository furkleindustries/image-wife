import {
  MetaRollType,
} from './MetaRollType';
import {
  MutationRollType,
} from './MutationRollType';
import {
  RollBaseTypes,
} from './RollBaseTypes';

export type FunctionalPseudoRollType = (
  args?: {
    args: RollBaseTypes | RollBaseTypes[],
    currentMetaRollChance: number,
    foundMetaRollThisRoll: boolean,
    resetMetaRollEachTick: boolean,
    lastMetaTickValue: number,
  },

  ...otherArgs: any[]
) => MutationRollType | MetaRollType;
