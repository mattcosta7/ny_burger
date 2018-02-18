import React from 'react';
import { Link } from 'react-router-dom';
import Styles from './styles.scss';

export default function Burger(props) {
  const {
    id, description, image, thumbnails, thumbnail,
  } = props;
  return (
    <li className={Styles['burger-container']}>
      <Link to={`/burgers/${id}`}>
        <div className={Styles.burger}>
          <img className={Styles.thumbnail} src={thumbnail} alt="burger" />
          <p className={Styles.description}>{description}</p>
        </div>
      </Link>
    </li>
  );
}
