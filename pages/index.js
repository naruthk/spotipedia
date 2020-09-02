import React, { useEffect, useContext } from 'react';
import Router from 'next/router';

import { AuthContext } from "../src/components/auth/AuthContext";
import PageLayout from "../src/components/layout/PageLayout";

export default function Home() {
  const { isLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    if (isLoggedIn) Router.replace("/app");
  }, [])

  return (
    <PageLayout title="Home">
      <h1>Landing page</h1>
    </PageLayout>
  )
}
