type Rows = [ number[], number[] ];

// https://stackoverflow.com/a/10284006
const zip = (rows: Rows) => (
  rows[0].map<[ number, number ]>((_, c) => (
    rows.map((row) => row[c]) as [ number, number ]
  ))
);

export const getRandomSlopeValues = () => {
  const total = 100;

  const tupleSize = 3;
  const dividersSize = tupleSize - 1;
  let dividers = new Array(dividersSize) as [ number, number, number ];

  for (let ii = 0; ii < dividersSize; ii += 1) {
    dividers[ii] = Math.ceil(Math.random() * total);
  }

  dividers = dividers.sort();

  let slopes = zip([
    [
      ...dividers,
      total,
    ],

    [
      0,
      ...dividers,
    ],
  ]).map(([ a, b ]) => a - b) as [ number, number, number ];

  return {
    redSlope: slopes[0] * 3 / 100,
    greenSlope: slopes[1] * 3 / 100,
    blueSlope: slopes[2] * 3 / 100,
  };
};
