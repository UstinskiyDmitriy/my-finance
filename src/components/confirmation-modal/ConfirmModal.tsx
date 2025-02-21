import styles from "./ConfirmModal.module.css";
import { signOut } from "../../features/services/authService";
interface ConfirmModalProps {
  onClose: () => void
}


export default function ConfirmModal({onClose}:ConfirmModalProps){
 
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h2>Вы точно хотите выйти?</h2>
        <button className={styles.closeButton} onClick={onClose}>
          ×
        </button>
        <button onClick={signOut} className={`${styles.confirm_button} ${styles.yes_button}`}>Да</button>
        <button onClick={onClose} className={`${styles.confirm_button} ${styles.no_button}`}>Нет</button>
      </div>
    </div>
  );
}
