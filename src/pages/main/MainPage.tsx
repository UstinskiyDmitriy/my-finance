import Comprasion from "../../components/comprasion/Comprasion";
import MillionButton from "../../components/for_millioners/million_button/MillionButton";
import { TransactionForm } from "../../components/transaction-form/TransactionForm";
import styles from "./MainPage.module.css";

export default function MainPage() {
  return (
    <div className={styles.main}>
      <h1>Финансовый Трекер</h1>
      <div className={styles.form}>
        <TransactionForm />
      </div>
      
        <Comprasion />
      <MillionButton />
    </div>
  );
}
