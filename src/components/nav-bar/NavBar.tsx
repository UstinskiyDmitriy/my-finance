import { NavLink } from "react-router-dom";
import { ChartPie, Clock, HandCoins, Home } from "lucide-react";
import styles from "./NavBar.module.css";

export default function NavBar() {
  return (
    <div className={styles.main}>
      <div className={styles.nav_menu}>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? styles.active : "")}
        >
          <Home className={styles.icon} />
        </NavLink>
        <NavLink
          to="/charts"
          className={({ isActive }) => (isActive ? styles.active : "")}
        >
          <ChartPie className={styles.icon} />
        </NavLink>
        <NavLink
          to="/history"
          className={({ isActive }) => (isActive ? styles.active : "")}
        >
          <Clock className={styles.icon} />
        </NavLink>
        <NavLink
          to="/savings"
          className={({ isActive }) => (isActive ? styles.active : "")}
        >
          <HandCoins className={styles.icon} />
        </NavLink>
      </div>
    </div>
  );
}
