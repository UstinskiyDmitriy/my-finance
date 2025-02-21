import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from "./App.module.css";
import MainPage from "./pages/main/MainPage";
import NavBar from "./components/nav-bar/NavBar";
import ChartPage from "./pages/chart/ChartPage";
import HistoryPage from "./pages/history/HistoryPage";
import Savings from "./pages/savings/Savings";
import { supabase } from "./app/supabase";
import AuthPage from "./pages/auth-page/AuthPage";

export default function App() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data.user) setUser(data.user);
    };
    getUser();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  return (
    <Router>
      <div className={styles.container}>
        {user && <NavBar />}
        <Routes>
          {user ? (
            <>
              <Route path="/" element={<MainPage />} />
              <Route path="/charts" element={<ChartPage />} />
              <Route path="/history" element={<HistoryPage />} />
              <Route path="/savings" element={<Savings />} />
              <Route path="*" element={<Navigate to="/" />} />
            </>
          ) : (
            <>
              <Route path="/auth" element={<AuthPage />} />
              <Route path="*" element={<Navigate to="/auth" />} />
            </>
          )}
        </Routes>
      </div>
    </Router>
  );
}

