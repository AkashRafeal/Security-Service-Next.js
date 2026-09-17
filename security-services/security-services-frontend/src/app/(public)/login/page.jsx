'use client';

import React, { Suspense } from 'react';
import { UserLoginPage } from '../../../views/public/UserLoginPage';
import { Loader } from '../../../components/common/Loader';

export default function Login() {
  return (
    <Suspense fallback={<Loader fullScreen message="Loading login portal..." />}>
      <UserLoginPage />
    </Suspense>
  );
}
