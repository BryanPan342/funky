import React from 'react';

import styles from '../styles/Graphics.module.scss';

export default function Graphics(): JSX.Element {

  return (
    <div id={styles.container}>
      <div id={styles.colors}>
        <div id={styles.red} className={styles.square} />
        <div id={styles.orange} className={styles.square} />
        <div id={styles.yellow} className={styles.square} />
        <div id={styles.green} className={styles.square} />
        <div id={styles.blue} className={styles.square} />
        <div id={styles.purple} className={styles.square} />
      </div>
    </div>
  );
}