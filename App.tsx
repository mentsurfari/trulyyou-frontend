
import React from 'react';
import { HashRouter, Routes, Route, Outlet, useLocation } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import SurgeonRoute from './components/SurgeonRoute';

import HomePage from './pages/HomePage';
import PhilosophyPage from './pages/PhilosophyPage';
import PlatformPage from './pages/PlatformPage';
import LibraryPage from './pages/LibraryPage';
import ArticleDetailPage from './pages/ArticleDetailPage'; // Import the new component
import SurgeonsPage from './pages/SurgeonsPage';
import JourneyTogetherPage from './pages/JourneyTogetherPage';
import MotivationCompassPage from './pages/MotivationCompassPage';
import PrepKitPage from './pages/PrepKitPage';
import SanctuaryCovenantPage from './pages/SanctuaryCovenantPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ProfilePage from './pages/ProfilePage';
import SanctuaryPage from './pages/SanctuaryPage';
import CohortPage from './pages/CohortPage';
import GeneralForumPage from './pages/GeneralForumPage';
import ThreadPage from './pages/ThreadPage';
import NewThreadPage from './pages/NewThreadPage';
import SurgeonDashboardPage from './pages/SurgeonDashboardPage';

const AppLayout: React.FC = () => {
    const { pathname } = useLocation();

    React.useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return (
        <div className="bg-white text-brand-charcoal font-sans flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};


const App: React.FC = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/philosophy" element={<PhilosophyPage />} />
          <Route path="/platform" element={<PlatformPage />} />
          <Route path="/sanctuary" element={<SanctuaryPage />} />
          <Route path="/journey-together" element={<JourneyTogetherPage />} />
          <Route path="/sanctuary/cohorts/:cohortId" element={<ProtectedRoute><CohortPage /></ProtectedRoute>} />
          <Route path="/sanctuary/general-forum" element={<ProtectedRoute><GeneralForumPage /></ProtectedRoute>} />
          <Route path="/sanctuary/threads/:threadId" element={<ProtectedRoute><ThreadPage /></ProtectedRoute>} />
          <Route path="/sanctuary/new-thread" element={<ProtectedRoute><NewThreadPage /></ProtectedRoute>} />
          <Route path="/library" element={<LibraryPage />} />
          <Route path="/library/:slug" element={<ArticleDetailPage />} /> {/* Add new route for article details */}
          <Route path="/for-surgeons" element={<SurgeonsPage />} />
          <Route path="/surgeon-dashboard" element={<SurgeonRoute><SurgeonDashboardPage /></SurgeonRoute>} />
          <Route path="/motivation-compass" element={<MotivationCompassPage />} />
          <Route path="/prep-kit" element={<PrepKitPage />} />
          <Route path="/sanctuary-covenant" element={<SanctuaryCovenantPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/profile" element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          } />
        </Route>
      </Routes>
    </HashRouter>
  );
};

export default App;
