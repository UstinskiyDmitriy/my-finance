import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import styles from './App.module.css';
import MainPage from './pages/main/MainPage';
import NavBar from './components/nav-bar/NavBar';
import ChartPage from './pages/chart/ChartPage';
import HistoryPage from './pages/history/HistoryPage';

export default function App() {
  return (
    <Router>
      <div className={styles.container}>
       <NavBar />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/charts" element={<ChartPage/>} />
          <Route path="/history" element={<HistoryPage/>} />
        </Routes>
      </div>
    </Router>
  );
}
