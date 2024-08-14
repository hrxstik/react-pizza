import React from 'react';
import styles from './NotFoundBlock.module.scss';

const NotFoundBlock = () => {
  return (
    <div className={styles.root}>
      <h1>
        <span>😯</span>
        Нема...
      </h1>
      <p className={styles.description}>Вы попали на несуществующую страницу</p>
    </div>
  );
};

export default NotFoundBlock;
