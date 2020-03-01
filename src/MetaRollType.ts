import {
  MetaRollHalfChance,
  MetaRollQuarterChance,
  MetaRollTenthChance,
  MetaRollFiftiethChance,
  MetaRollHundredthChance,
  MetaRollDoResetEachTick,
  MetaRollDontResetEachTick,
} from './MetaRolls';

export type MetaRollType =
  typeof MetaRollHalfChance |
    typeof MetaRollQuarterChance |
    typeof MetaRollTenthChance |
    typeof MetaRollFiftiethChance |
    typeof MetaRollHundredthChance |
    typeof MetaRollDoResetEachTick |
    typeof MetaRollDontResetEachTick;
