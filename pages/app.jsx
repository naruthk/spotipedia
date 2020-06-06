import React, { useContext, useEffect } from 'react';
import Router from 'next/router';

import { AuthContext } from "../src/components/auth/AuthContext";
import { PlayerProvider } from "../src/components/player/PlayerContext";
import Layout from "../src/components/layout/Layout";
import Dashboard from "../src/components/dashboard/Dashboard";

export default function DashboardPage() {
  const { user, isLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    if (!user || !isLoggedIn) Router.replace("/");
  }, [])

  return (
    <Layout>
      <PlayerProvider>
        <Dashboard />
      </PlayerProvider>
    </Layout>
  )
}
