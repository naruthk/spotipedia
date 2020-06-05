import React, { useContext } from "react";
import Link from "next/link";

import { AuthContext } from "../auth/AuthContext";

export default function Header() {
  const { isLoggedIn, user } = useContext(AuthContext);

  return (
    <div className="Header">
      <ul>
        <li><Link href="/">Home</Link></li>
        {isLoggedIn ? <li>Feed</li> : <li><Link href="/login">Login</Link></li>}
      </ul>
      {user && (
        <div className="ProfileComponent">
          <section className="user_info">
            <span className="user_info --country_flag">{user.country}</span>
            <span className="user_info --display_name">{user.displayName}</span>
          </section>
        </div>
      )}
    </div>
  );
}
