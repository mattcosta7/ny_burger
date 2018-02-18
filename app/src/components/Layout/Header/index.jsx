import React from 'react';
import burgerImage from '../../../assets/burger-main.jpg';
import styles from './styles.scss';

export default function Header() {
  return (
    <header
      style={{
        backgroundImage: `url(${burgerImage})`,
      }}
      className={styles.header}
    >
      {/* <img src={burgerImage} alt="background burger" /> */}
    </header>
  );
}
