import React, { useContext } from 'react';

import { AuthContext } from "../auth/AuthContext";

import styles from "./Sidebar.module.scss";

export default function Player() {
  const { user } = useContext(AuthContext);

  return (
    <div className={styles.container}>
      {user && (
        <section className={styles.accountInfo}>
          <h1>{user.displayName}</h1>
          <h2>{user.country}</h2>
        </section>
      )}
      <ul>
        <li>For Me</li>
        <li>Recommend</li>
        <li>Top 50</li>
        <li>Search</li>
      </ul>
    </div>
  )
}
