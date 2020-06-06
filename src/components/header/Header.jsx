import React, { useContext } from "react";
import Link from "next/link";

import { AuthContext } from "../auth/AuthContext";

import styles from "./Header.module.scss";

export default function Header() {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <header className={styles.container}>
      <nav>
        <ul>
          <li><Link href="/">Home</Link></li>
          {!isLoggedIn && <li><Link href="/login">Login</Link></li>}
          <li>Support</li>
        </ul>
      </nav>
    </header>
  );
}
