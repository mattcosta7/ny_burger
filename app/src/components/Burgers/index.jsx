import React from 'react';
import Burger from '../Burger';
import Styles from './styles.scss';

export default function Burgers({ burgers }) {
  return (
    <ul className={Styles['burgers-list']}>
      {burgers.map(burger => <Burger key={burger.id} {...burger} />)}
    </ul>
  );
}
