import React, { useEffect, useContext } from 'react';
import Router from 'next/router';

import { AuthContext } from "../src/components/auth/AuthContext";
import PageLayout from "../src/components/layout/PageLayout";

export default function Callback() {
  const { user, isLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    if (user && isLoggedIn) Router.replace("/app");
  }, []);

  return (
    <PageLayout title="Authorizing">
      <p>Please wait while we authorize your credentials...</p>
    </PageLayout>
  )
}
