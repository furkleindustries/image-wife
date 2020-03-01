import {
  RollTypes,
} from './RollTypes';

export const getCurrentMetaRollChance = (
  currentMetaRollChance: number,
  arg: symbol,
) => {
  if (arg === RollTypes.MetaRollHalfChance) {
    return 0.5;
  } else if (arg === RollTypes.MetaRollQuarterChance) {
    return 0.25;
  } else if (arg === RollTypes.MetaRollTenthChance) {
    return 0.1;
  } else if (arg === RollTypes.MetaRollFiftiethChance) {
    return 0.025;
  } else if (arg === RollTypes.MetaRollHundredthChance) {
    return 0.01;
  }

  return currentMetaRollChance;
};
