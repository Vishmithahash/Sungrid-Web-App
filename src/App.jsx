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
// Member 3 Pages (Reservations)
import ReservationsPage from './pages/backoffice/ReservationsPage';
import ReservationDetailsPage from './pages/backoffice/ReservationDetailsPage';
export default function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/unauthorized" element={<UnauthorizedPage />} />
      {/* Authenticated Layout Routes */}
      <Route
        element={
          <ProtectedRoute>
            <ApplicationLayout />
          </ProtectedRoute>
        }
      >
        {/* Shared Protected */}
        <Route path="/profile" element={<ProfilePage />} />
        {/* Backoffice Navigation Redirect */}
        <Route
          path="/backoffice"
          element={<Navigate to="/backoffice/users" replace />}
        />
        {/* Common User Management Routes */}
        <Route
          path="/backoffice/users"
          element={
            <RoleProtectedRoute allowedRoles={['BackofficeOfficer']}>
              <WebUsersPage />
            </RoleProtectedRoute>
          }
        />
        <Route
          path="/backoffice/prosumers"
          element={
            <RoleProtectedRoute allowedRoles={['BackofficeOfficer']}>
              <ProsumersPage />
            </RoleProtectedRoute>
          }
        />
        <Route
          path="/backoffice/prosumers/pending"
          element={
            <RoleProtectedRoute allowedRoles={['BackofficeOfficer']}>
              <PendingActivationsPage />
            </RoleProtectedRoute>
          }
        />
        {/* Member 3 Reservation Routes */}
        <Route
          path="/backoffice/reservations"
          element={
            <RoleProtectedRoute allowedRoles={['BackofficeOfficer']}>
              <ReservationsPage />
            </RoleProtectedRoute>
          }
        />
        <Route
          path="/backoffice/reservations/:id"
          element={
            <RoleProtectedRoute allowedRoles={['BackofficeOfficer']}>
              <ReservationDetailsPage />
            </RoleProtectedRoute>
          }
        />
      </Route>
      {/* 404 Catch-All */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
