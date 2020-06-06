import React from 'react';

import styles from "./Loading.module.scss";

export default function Loading() {
  return (
    <div className={styles.container}>
      <h1>Loading...</h1>
      <p>Just a moment please.</p>
    </div>
  )
}
