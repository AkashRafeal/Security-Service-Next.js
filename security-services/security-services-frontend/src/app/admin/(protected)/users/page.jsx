'use client';

import ProtectedRoute from '../../../../routes/ProtectedRoute';
import AdminUsersPage from '../../../../views/admin/AdminUsersPage';

export default function Users() {
  return (
    <ProtectedRoute requiredRole="ROLE_ADMIN">
      <AdminUsersPage />
    </ProtectedRoute>
  );
}
