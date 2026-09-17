'use client';

import ProtectedRoute from '../../../../routes/ProtectedRoute';
import AdminAuditLogsPage from '../../../../views/admin/AdminAuditLogsPage';

export default function AuditLogs() {
  return (
    <ProtectedRoute requiredRole="ROLE_ADMIN">
      <AdminAuditLogsPage />
    </ProtectedRoute>
  );
}
