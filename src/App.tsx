import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import GlobalStyle from './styles/GlobalStyle';
import ProtectedRoute from './components/auth/ProtectedRoute';
import SplashPage from './pages/SplashPage';
import AuthStartPage from './pages/AuthStartPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import HomePage from './pages/HomePage';
import ScanPage from './pages/ScanPage';
import ScanResultPage from './pages/ScanResultPage';
import HistoryPage from './pages/HistoryPage';
import GuidePage from './pages/GuidePage';
import MyPage from './pages/MyPage';
import ProfileEditPage from './pages/ProfileEditPage';
import NotificationCenterPage from './pages/NotificationCenterPage';
import NotificationSettingsPage from './pages/NotificationSettingsPage';
import AccountDeletionPage from './pages/AccountDeletionPage';
import SupportPage from './pages/SupportPage';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <GlobalStyle />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<SplashPage />} />
          <Route path="/splash" element={<SplashPage />} />
          <Route path="/auth" element={<AuthStartPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/guide" element={<GuidePage />} />
          <Route path="/support" element={<SupportPage />} />

          {/* Protected Routes */}
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/scan"
            element={
              <ProtectedRoute>
                <ScanPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/scan-result"
            element={
              <ProtectedRoute>
                <ScanResultPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/history"
            element={
              <ProtectedRoute>
                <HistoryPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/mypage"
            element={
              <ProtectedRoute>
                <MyPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile-edit"
            element={
              <ProtectedRoute>
                <ProfileEditPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/notifications"
            element={
              <ProtectedRoute>
                <NotificationCenterPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/notification-settings"
            element={
              <ProtectedRoute>
                <NotificationSettingsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/account-deletion"
            element={
              <ProtectedRoute>
                <AccountDeletionPage />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
