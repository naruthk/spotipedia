import React from "react";
import styles from "./Callback.module.scss";

export default function Callback() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Authorizing ...</h1>
      <p>Establishing connection with Spotify</p>
    </div>
  )
}
