import React from 'react';
import { Link } from 'react-router-dom';
import Image from '../Image';
import Styles from './styles.scss';

export default function Burger(props) {
  const {
    id, description, image, thumbnails, thumbnail,
  } = props;
  return (
    <div className={Styles['burger-container']}>
      <Link to={`/burgers/${id}`}>
        <div className={Styles.burger}>
          <Image
            className={Styles.thumbnail}
            src={image}
            placeholder={thumbnails[0].src}
            alt="burger"
          />
          <p className={Styles.description}>{description}</p>
        </div>
      </Link>
    </div>
  );
}
