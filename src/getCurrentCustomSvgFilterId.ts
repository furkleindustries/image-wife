let filterId = 0;

export const getCurrentCustomSvgFilterId = () => filterId;

export const setCurrentCustomSvgFilterId = () => (
  filterId += 1
);
