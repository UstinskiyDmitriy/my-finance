import Comprasion from "../../components/comprasion/Comprasion";
import { TransactionForm } from "../../components/transaction-form/TransactionForm";
import styles from "./MainPage.module.css";

export default function MainPage() {
  return (
    <div className={styles.main}>
      <h1>Финансовый Трекер</h1>
      <div className={styles.form}>
        <TransactionForm />
      </div>
      <div className={styles.comprasion}>
        <Comprasion />
      </div>
    </div>
  );
}
