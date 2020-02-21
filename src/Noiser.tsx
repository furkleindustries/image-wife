import {
  getRandomIndex,
} from './getRandomIndex';
import {
  NoiserProps,
} from './NoiserProps';

import * as React from 'react';
  
export const Noiser: React.FunctionComponent<NoiserProps> = ({
  imageUrls,
  filter: {
    blur,
    saturation,
  } = {
    blur: 0,
    saturation: 1,
  },

  opacity: opac = 1,
  zIndex: zind = 1,
  imagesPreloadedPromise = Promise.resolve(),
}) => {
  const [ preloaded, setPreloaded ] = React.useState(false);

  imagesPreloadedPromise.then(() => (
    setPreloaded(true)
  ));

  /* private canvasRef = React.createRef<HTMLCanvasElement>();

  constructor(props: NoiserProps) {
    super(props);

    const { gridSize } = this.props;

    setTimeout(() => {
      const imageData = new ImageData(gridSize, gridSize);
      for (let ii = 0; ii < imageData.data.length; ii += 1) {
        // 0: R, 1: G, 2: B, 3: A
  
        const x = ii % (gridSize * 4);
        const y = Math.round(ii / (gridSize * 4));
        
        imageData.data[ii] = rand(x, y);
        imageData.data[ii + 1] = rand(x, y);
        imageData.data[ii + 2] = rand(x, y);
        imageData.data[ii + 3] = Math.floor(Math.random() * 255);
      }
  
      this.setState({ imageData });
    });
  } */

  const url = getRandomIndex(imageUrls);

  const urlBase = url
    /* Get the last path component. */
    .split('/').slice(-1)[0]
    .split('.').slice(-1)[0];

  const blurVal = blur || 0;
  const saturateVal = saturation! >= 0 && saturation! <= 1 ? saturation! : 1;
  const filter = `blur(${blurVal}px) saturate(${saturateVal})`;
  const opacity = opac || 1;
  const zIndex = zind || 1;

  const style = {
    position: 'absolute' as 'absolute',
    width: '100%',
    height: '100%',
    opacity,
    filter,
    zIndex,
  };

  return (
    <img
      className={`noiser ${urlBase}`}
      src={getRandomIndex(imageUrls)}
      style={style}
    />
  );

  /* const { imageData } = this.state;
  if (imageData) {
    const { gridSize } = this.props;

    const canvas = this.canvasRef.current!;
    canvas.width = gridSize;
    canvas.height = gridSize;
    this.canvasRef.current!.getContext('2d')!.putImageData(
      this.state.imageData!,
      0,
      0,
    )
  }
  
  return (
    <canvas
      ref={this.canvasRef}
      ...style from above
    />
  ); */
};
  