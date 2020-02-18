import {
  RollTypes,
} from './RollTypes';

export const isTransformRoll = (roll: any) => (
  roll === RollTypes.ReflectTransform ||
    roll === RollTypes.RotateTransform
);
