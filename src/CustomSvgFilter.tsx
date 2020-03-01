import {
  CustomSvgFilterProps,
} from './CustomSvgFilterProps';
import {
  getCurrentCustomSvgFilterId, setCurrentCustomSvgFilterId,
} from './getCurrentCustomSvgFilterId';
import {
  getRandomSlopeValues,
} from './getRandomSlopeValues';
import {
  RollTypes,
} from './RollTypes';

import * as React from 'react';

export const CustomSvgFilter: React.FunctionComponent<CustomSvgFilterProps> = ({
  type,
}) => {
  let [
    filterId,
    setFilterId,
  ] = React.useState<number>();

  if (filterId === undefined) {
    filterId = setCurrentCustomSvgFilterId();
    setFilterId(filterId);
  }

  if (type !== RollTypes.MonochromeFilter) {
    throw new Error(
      'Unrecognized type. CustomSvgFilter only supports RollTypes.MonochromeFilter at present.',
    );
  }

  const {
    redSlope,
    greenSlope,
    blueSlope,
  } = getRandomSlopeValues();

  return (
    <div
      className="custom-svg-filter-container"
      hidden
    >
      <svg xmlns="http://www.w3.org/2000/svg">
        <filter id={`filter-${filterId}`} x="0" y="0" width="100%" height="100%">
          <feComponentTransfer>
            <feFuncR type="linear" slope={redSlope} />
            <feFuncG type="linear" slope={greenSlope} />
            <feFuncB type="linear" slope={blueSlope} />
          </feComponentTransfer>
        </filter>
      </svg>
    </div>
  );
};
