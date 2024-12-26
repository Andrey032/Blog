import React from 'react';
import { useImage } from 'react-image';

import style from './ImageComponent.module.scss';

const ImageComponent = ({ image }) => {
  const { src } = useImage({
    srcList: [image, '/avatar.svg'],
  });
  return <img className={style.avatar} src={src} alt='аватар' />;
};

export default ImageComponent;
