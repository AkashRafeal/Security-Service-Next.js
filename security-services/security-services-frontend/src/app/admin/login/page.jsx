'use client';

import React, { Suspense } from 'react';
import { AdminLoginPage } from '../../../views/admin/AdminLoginPage';
import { Loader } from '../../../components/common/Loader';

export default function AdminLogin() {
  return (
    <Suspense fallback={<Loader fullScreen message="Loading administrative portal..." />}>
      <AdminLoginPage />
    </Suspense>
  );
}
