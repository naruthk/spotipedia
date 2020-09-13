import React, { useContext } from "react";
import Link from "next/link";

import { AuthContext } from "../auth/AuthContext";

import styles from "./Header.module.scss";

export default function Header() {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <header className={styles.container}>
      <nav className={styles.navigation}>
        <ul className={styles.primaryArea}>
          <li>
            <Link href="/">
              <a href="/" title="Spotipedia">Spotipedia</a>
            </Link>
          </li>
        </ul>
        <ul className={styles.secondaryArea}>
          {!isLoggedIn && (
            <li>
              <Link href="/login">
                <a href="/login" className={styles.loginBtn} title="Login">Login</a>
              </Link>
            </li>
          )}
          <li>Support</li>
        </ul>
      </nav>
    </header>
  );
}
