import {
  RollTypes,
} from './RollTypes';

export const hasIncompatibleRolls = (
  args: Array<string | symbol>,
  noiseImageUrls?: string[],
) => {
  if (args.includes(RollTypes.InvertHueRotateFilter) &&
    args.includes(RollTypes.HueRotateFilter))
  {
    return new Error(
      'Cannot combine InvertHueRotateFilter and HueRotateFilter.',
    );
  } else if (args.includes(RollTypes.NoiseFilter) &&
    (!noiseImageUrls || !noiseImageUrls.length))
  {
    return new Error(
      `Can't use NoiseFilter without any image URLs to use for noise.`,
    );
  } else if (args.includes(RollTypes.MonochromeFilter) &&
    args.includes(RollTypes.SaturateFilter))
  {
    return new Error(
      `Cannot combine Monochromefilter and SaturateFilter.`,
    );
  }

  return null;
};
