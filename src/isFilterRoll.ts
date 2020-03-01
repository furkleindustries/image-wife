import {
  RollTypes,
} from './RollTypes';

export const isFilterRoll = (roll: any) => (
  roll === RollTypes.BrightnessFilter ||
    roll === RollTypes.ContrastFilter ||
    roll === RollTypes.HueRotateFilter ||
    roll === RollTypes.InvertHueRotateFilter ||
    roll === RollTypes.MonochromeFilter ||
    roll === RollTypes.NoiseFilter ||
    roll === RollTypes.SaturateFilter ||
    roll === RollTypes.SepiaFilter
);
