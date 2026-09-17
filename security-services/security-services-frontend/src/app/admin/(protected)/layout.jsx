'use client';

import ProtectedRoute from '../../../routes/ProtectedRoute';
import AdminLayout from '../../../components/admin/AdminLayout';

export default function AdminProtectedLayout({ children }) {
  return (
    <ProtectedRoute>
      <AdminLayout>
        {children}
      </AdminLayout>
    </ProtectedRoute>
  );
}
