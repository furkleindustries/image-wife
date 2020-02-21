import {
  brightnessFilter,
  contrastFilter,
  hueRotateFilter,
  invertHueRotateFilter,
  saturateFilter,
  sepiaFilter,
} from './filters';
import {
  reflectTransform,
  rotateTransform,
} from './transforms';

export const getRollRandomStyleExpressionGeneratorMap = (): Record<string, (...args: any[]) => string> => ({
  BrightnessFilter: brightnessFilter,
  ContrastFilter: contrastFilter,
  HueRotateFilter: hueRotateFilter,
  InvertHueRotateFilter: invertHueRotateFilter,
  ReflectTransform: reflectTransform,
  RotateTransform: rotateTransform,
  SaturateFilter: saturateFilter,
  SepiaFilter: sepiaFilter,
});
