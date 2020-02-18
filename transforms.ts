export const reflectTransform = (val: number) => {
  if (!val) {
    return 'scaleX(-1) '; 
  } else if (val === 1) {
    return 'scaleY(-1) ';
  }

  return 'scaleX(-1) scaleY(-1) ';
};

export const rotateTransform = (val: number) => {
  if (!val) {
    return 'rotate(90deg) ';
  } else if (val === 1) {
    return 'rotate(180deg) ';
  }

  return 'rotate(270deg) ';
};
