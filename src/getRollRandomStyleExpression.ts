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

type Gen = (...args: any[]) => string;

export const getRollRandomStyleExpressionGeneratorMap = (): Record<string, Gen> => ({
  BrightnessFilter: brightnessFilter,
  ContrastFilter: contrastFilter,
  HueRotateFilter: hueRotateFilter,
  InvertHueRotateFilter: invertHueRotateFilter,
  ReflectTransform: reflectTransform,
  RotateTransform: rotateTransform,
  SaturateFilter: saturateFilter,
  SepiaFilter: sepiaFilter,
});
