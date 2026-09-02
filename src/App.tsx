import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import GlobalStyle from './styles/GlobalStyle';
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
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<SplashPage />} />
        <Route path="/splash" element={<SplashPage />} />
        <Route path="/auth" element={<AuthStartPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/scan" element={<ScanPage />} />
        <Route path="/scan-result" element={<ScanResultPage />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/guide" element={<GuidePage />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/profile-edit" element={<ProfileEditPage />} />
        <Route path="/notifications" element={<NotificationCenterPage />} />
        <Route path="/notification-settings" element={<NotificationSettingsPage />} />
        <Route path="/account-deletion" element={<AccountDeletionPage />} />
        <Route path="/support" element={<SupportPage />} />
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
