A small library for compile-time and runtime procedural modification of photographic images.

```tsx
const sources = [
  'https://media.discordapp.net/attachments/635344640769261568/678729526217408582/20200216_172804.jpg?width=1191&height=1198',
  'https://media.discordapp.net/attachments/635344640769261568/678730679156080650/20200216_173301.jpg?width=1173&height=1196',
  'https://media.discordapp.net/attachments/628925396108443648/678754090997776417/20200216_190539.jpg?width=1197&height=1197',
  'https://media.discordapp.net/attachments/628925396108443648/678754302604345344/20200215_151225.jpg?width=1197&height=1197',
  'https://media.discordapp.net/attachments/628925396108443648/678754456396890112/20200215_111702.jpg?width=1197&height=1197',
  'https://media.discordapp.net/attachments/628925396108443648/678755356968615966/20200216_191104.jpg?width=1164&height=1198',
  'https://media.discordapp.net/attachments/628925396108443648/678756320215695390/20200216_191429.jpg?width=1197&height=1197',
  'https://media.discordapp.net/attachments/628925396108443648/678757740381863938/20200216_192036.jpg?width=1197&height=1197',
  'https://media.discordapp.net/attachments/628925396108443648/646509966311555083/20191119_184328.jpg?width=1197&height=1197',
];

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
  <div className='wives'>
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
```
