import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import ApplicationLayout from './components/layout/ApplicationLayout';
import ProtectedRoute from './components/common/ProtectedRoute';
import RoleProtectedRoute from './components/common/RoleProtectedRoute';

// Public Pages
import HomePage from './pages/public/HomePage';
import LoginPage from './pages/public/LoginPage';
import RegisterPage from './pages/public/RegisterPage';
import UnauthorizedPage from './pages/public/UnauthorizedPage';
import NotFoundPage from './pages/public/NotFoundPage';

// Shared Pages
import ProfilePage from './pages/shared/ProfilePage';

// Common User Management Pages
import WebUsersPage from './pages/backoffice/WebUsersPage';
import ProsumersPage from './pages/backoffice/ProsumersPage';
import PendingActivationsPage from './pages/backoffice/PendingActivationsPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/unauthorized" element={<UnauthorizedPage />} />

      <Route element={<ProtectedRoute><ApplicationLayout /></ProtectedRoute>}>
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/backoffice" element={<Navigate to="/backoffice/users" replace />} />
        <Route path="/backoffice/users" element={<RoleProtectedRoute allowedRoles={['BackofficeOfficer']}><WebUsersPage /></RoleProtectedRoute>} />
        <Route path="/backoffice/prosumers" element={<RoleProtectedRoute allowedRoles={['BackofficeOfficer']}><ProsumersPage /></RoleProtectedRoute>} />
        <Route path="/backoffice/prosumers/pending" element={<RoleProtectedRoute allowedRoles={['BackofficeOfficer']}><PendingActivationsPage /></RoleProtectedRoute>} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
