import { BrowserRouter as Router, Routes, Route } from "react-router";
import HomePage from "@/react-app/pages/Home";
import MalwareDetectedPage from "@/react-app/pages/MalwareDetected";
import ScanningPage from "@/react-app/pages/Scanning";
import CleanupPage from "@/react-app/pages/Cleanup";
import EducationPage from "@/react-app/pages/Education";
import QuizPage from "@/react-app/pages/Quiz";
import AnalyticsPage from "@/react-app/pages/Analytics";
import { AnalyticsProvider } from "@/react-app/hooks/useAnalytics";

export default function App() {
  return (
    <Router>
      <AnalyticsProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/scan" element={<MalwareDetectedPage />} />
          <Route path="/scanning" element={<ScanningPage />} />
          <Route path="/cleanup" element={<CleanupPage />} />
          <Route path="/education" element={<EducationPage />} />
          <Route path="/quiz" element={<QuizPage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
        </Routes>
      </AnalyticsProvider>
    </Router>
  );
}
