import {
  MetaRollHalfChance,
  MetaRollQuarterChance,
  MetaRollTenthChance,
  MetaRollFiftiethChance,
  MetaRollHundredthChance,
  MetaRollDoResetEachTick,
  MetaRollDontResetEachTick,
} from './MetaRolls';

type RollTypesInternal = {
  BrightnessFilter: 'BrightnessFilter';
  ContrastFilter: 'ContrastFilter';
  HueRotateFilter: 'HueRotateFilter';
  InvertHueRotateFilter: 'InvertHueRotateFilter';
  MonochromeFilter: 'MonochromeFilter';
  NoiseFilter: 'NoiseFilter';
  ReflectTransform: 'ReflectTransform';
  RotateTransform: 'RotateTransform';
  SaturateFilter: 'SaturateFilter';
  SepiaFilter: 'SepiaFilter';
  MetaRollHalfChance: typeof MetaRollHalfChance;
  MetaRollQuarterChance: typeof MetaRollQuarterChance;
  MetaRollTenthChance: typeof MetaRollTenthChance;
  MetaRollFiftiethChance: typeof MetaRollFiftiethChance;
  MetaRollHundredthChance: typeof MetaRollHundredthChance;
  MetaRollDoResetEachTick: typeof MetaRollDoResetEachTick;
  MetaRollDontResetEachTick: typeof MetaRollDontResetEachTick;
};

export const RollTypes: RollTypesInternal = {
  BrightnessFilter: 'BrightnessFilter',
  ContrastFilter: 'ContrastFilter',
  HueRotateFilter: 'HueRotateFilter',
  InvertHueRotateFilter: 'InvertHueRotateFilter',
  MonochromeFilter: 'MonochromeFilter',
  NoiseFilter: 'NoiseFilter',
  ReflectTransform: 'ReflectTransform',
  RotateTransform: 'RotateTransform',
  SaturateFilter: 'SaturateFilter',
  SepiaFilter: 'SepiaFilter',
  MetaRollHalfChance,
  MetaRollQuarterChance,
  MetaRollTenthChance,
  MetaRollFiftiethChance,
  MetaRollHundredthChance,
  MetaRollDoResetEachTick,
  MetaRollDontResetEachTick,
};
