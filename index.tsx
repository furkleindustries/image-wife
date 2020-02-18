export {
  ImageWife,
} from './ImageWife';
export {
  ImageWifeProps,
} from './ImageWifeProps';
export {
  MetaRollDoResetEachTick,
  MetaRollDontResetEachTick,
  MetaRollFiftiethChance,
  MetaRollHalfChance,
  MetaRollHundredthChance,
  MetaRollQuarterChance,
  MetaRollTenthChance,
} from './MetaRolls';
export {
  RollTypes,
} from './RollTypes';

/* Sample usage:

const rolls = [
  RollTypes.MetaRollQuarterChance,
  RollTypes.BrightnessFilter,
  RollTypes.ContrastFilter,

  () => (
    Math.random() > 0.3 ?
      RollTypes.HueRotateFilter :
      RollTypes.InvertHueRotateFilter
  ),

  RollTypes.SaturateFilter,
  RollTypes.SepiaFilter,
  RollTypes.MetaRollFiftiethChance,
  RollTypes.ReflectTransform,
  RollTypes.RotateTransform,
];

ReactDOM.render(
  <div className="wives">
    {sources.map((src, key) => (
      <ImageWife
        key={key}
        rolls={rolls}
        src={src}
      />
    ))}
  </div>,
  document.getElementById('root'),
);
*/
