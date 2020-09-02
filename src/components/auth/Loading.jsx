import React from 'react';

import styles from "./Loading.module.scss";

export default function Loading() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Setting up ...</h1>
      <p>Hold on tight while we prepare everything for you</p>
    </div>
  )
}
