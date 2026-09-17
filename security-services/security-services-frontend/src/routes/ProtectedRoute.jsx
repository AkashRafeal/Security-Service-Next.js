'use client';

import React, { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
import Loader from '../components/common/Loader';

const ProtectedRoute = ({ children, requiredRole }) => {
  const { isAuthenticated, user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.replace('/admin/login');
    }
  }, [loading, isAuthenticated, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-navy-950">
        <Loader size="lg" text="Verifying tactical clearance..." />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  if (requiredRole && user?.roles) {
    const hasRole = user.roles.some(
      (r) => r === requiredRole || r.name === requiredRole || r === 'ROLE_ADMIN' || r.name === 'ROLE_ADMIN'
    );
    if (!hasRole) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-navy-50 p-4">
          <div className="bg-white p-8 rounded-xl shadow-card text-center max-w-md">
            <h2 className="text-2xl font-bold text-red-600 mb-2">Access Denied</h2>
            <p className="text-navy-600 text-sm mb-4">
              Your security clearance level does not authorize access to this tactical module.
            </p>
            <Link
              href="/admin/dashboard"
              className="inline-block bg-navy-900 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-navy-800"
            >
              Return to Operations Dashboard
            </Link>
          </div>
        </div>
      );
    }
  }

  return children;
};

export default ProtectedRoute;
