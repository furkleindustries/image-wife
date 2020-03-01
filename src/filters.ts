import {
  setCurrentCustomSvgFilterId,
} from './getCurrentCustomSvgFilterId';

export const brightnessFilter = (val: number) => `brightness(${val + 100}%) `;
export const contrastFilter = (val: number) => `contrast(${val + 100}%) `;
export const customSvgFilter = (val: number) => `url('#filter-${val}') `;
export const hueRotateFilter = (val: number) => `hue-rotate(${val}deg) `;
export const invertHueRotateFilter = () => `hue-rotate(180deg) invert(1) `;
export const monochromeFilter = (val: number) => {
  const filterId = setCurrentCustomSvgFilterId();
  const svgFilter = customSvgFilter(filterId);
  const filter = svgFilter + `grayscale(${100 - val}%) `;

  return filter;
};

export const saturateFilter = (val: number) => `saturate(${val + 100}%) `;
export const sepiaFilter = (val: number) => `sepia(${val}%) `;

