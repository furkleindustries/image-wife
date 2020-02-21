export const brightnessFilter = (val: number) => `brightness(${val + 100}%) `;
export const contrastFilter = (val: number) => `contrast(${val + 100}%) `;
export const hueRotateFilter = (val: number) => `hue-rotate(${val}deg) `;
export const invertHueRotateFilter = () => `hue-rotate(180deg) invert(1) `;
export const saturateFilter = (val: number) => `saturate(${val + 100}%) `;
export const sepiaFilter = (val: number) => `sepia(${val}%) `;
