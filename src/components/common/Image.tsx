import { twMerge } from 'tailwind-merge';
import { images } from '../constants/images';

const IMAGE_WIDTH_DEFAULT = 1200;
const IMAGE_HEIGHT_DEFAULT = 630;

const Image = ({
  src = images.defaultImage,
  alt = '',
  className = '',
  height = IMAGE_HEIGHT_DEFAULT,
  width = IMAGE_WIDTH_DEFAULT,
  onClick = () => {},
}) => {
  const classes = twMerge('w-auto h-auto', className);

  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={classes}
      onClick={onClick}
    />
  );
};

export default Image;
