import {
  getDelayConfusionFactor,
} from './getDelayConfusionFactor';
import {
  getDelayTime,
} from './getDelayTime';

export const getConfusedDelayTime = () => (
  getDelayTime() * (1 - getDelayConfusionFactor() * Math.random())
);
