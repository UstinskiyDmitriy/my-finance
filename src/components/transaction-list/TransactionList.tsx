import { useTransactions } from "../../features/transactions/hooks";
import { formatDate } from "../../shared/lib/helpers";
import { Transaction } from "../../features/transactions/types";
import styles from "./TransactionList.module.css";

export const TransactionList = () => {
  const { transactions, deleteTransaction } = useTransactions();

  return (
    <div>
      <h1>История операций</h1>

      {transactions.length === 0 ? (
        <h2 className={styles.no_have}>Нет операций</h2>
      ) : (
        <div className={styles.main}>
          {transactions?.map((transaction: Transaction) => (
            <div
              key={transaction.id}
              className={`${styles.transaction_card} ${
                transaction.type === "income" ? styles.income : styles.expense
              }`}
            >
              <div className={styles.card_content}>
                <h3 className={styles.transaction_category}>
                  {transaction.category}
                </h3>
                <time>{formatDate(transaction.date)}</time>
                <div className={styles.amount}>
                  <span>{transaction.type === "income" ? "+" : "-"}</span>
                  <p>{transaction.amount.toLocaleString()} ₽</p>
                </div>
              </div>
              <button
                onClick={() => deleteTransaction(transaction.id)}
                className={styles.button}
              >
                Удалить
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
