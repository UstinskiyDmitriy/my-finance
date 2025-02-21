import { NavLink } from "react-router-dom";
import { ChartPie, Clock, HandCoins, Home, LogOut } from "lucide-react";
import styles from "./NavBar.module.css";

import { useState } from "react";
import ConfirmModal from "../confirmation-modal/ConfirmModal";

export default function NavBar() {
  const [open, setOpen]= useState(false) 

  const openModal = () => {
    setOpen(true)
  }

  const closeModal = () => {
    setOpen(false)
  }
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
        <div>
          <LogOut className={styles.icon} onClick={openModal}/>
        </div>
        {open && <ConfirmModal onClose={closeModal}/>}
      </div>
    </div>
  );
}
