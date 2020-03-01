import {
  RollTypes,
} from './RollTypes';

export type MutationRollType =
  typeof RollTypes['BrightnessFilter'] |
    typeof RollTypes['ContrastFilter'] |
    typeof RollTypes['HueRotateFilter'] |
    typeof RollTypes['InvertHueRotateFilter'] |
    typeof RollTypes['MonochromeFilter'] |
    typeof RollTypes['NoiseFilter'] |
    typeof RollTypes['ReflectTransform'] |
    typeof RollTypes['RotateTransform'] |
    typeof RollTypes['SaturateFilter'] |
    typeof RollTypes['SepiaFilter'];
