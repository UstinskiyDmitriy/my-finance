import { useState } from "react";
import styles from "./Comprasion.module.css";
import TransactionModal from "../transaction-modal/TransactionModal";
import { useTransactions } from "../../hooks/useTransactions";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
export default function Comprasion() {
  const savings = useSelector((state: RootState) => state.transactions.savings);
  const { incomeTotal, expenseTotal } = useTransactions();
  const [modalType, setModalType] = useState<"income" | "expense" | null>(null);
  const openModal = (type: "income" | "expense") => () => {
    setModalType(type);
  };

  const closeModal = () => {
    setModalType(null);
  };

  return (
    <div className={styles.comparison_container}>
      <div className={styles.column} onClick={openModal("income")}>
        <h3 className={styles.title}>Доходы</h3>
        <div className={`${styles.screen} ${styles.income}`}>
          {incomeTotal - savings} ₽
        </div>
      </div>
      <div className={`${styles.column}`} onClick={openModal("expense")}>
        <h3 className={styles.title}>Расходы</h3>
        <div className={`${styles.screen} ${styles.expense}`}>
          {expenseTotal.toLocaleString()} ₽
        </div>
      </div>

      {modalType && <TransactionModal type={modalType} onClose={closeModal} />}
    </div>
  );
}
