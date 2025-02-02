import { useTransactions } from '../../features/transactions/hooks';
import { formatDate } from '../../shared/lib/helpers';
import { Transaction } from '../../features/transactions/types';
import styles from './TransactionList.module.css'

export const TransactionList = () => {
  const { transactions, deleteTransaction } = useTransactions();

  return (
    <div>
      <h2>История операций</h2>
      
      {transactions.length === 0 ? (
        <p>Нет операций</p>
      ) : (
        <div className={styles.main}>
          {transactions?.map((transaction:Transaction) => (
            <div
              key={transaction.id}
              className={`${styles.transaction_card} ${transaction.type === 'income' ? styles.income : styles.expense}`}
            >
              <div>
                <div>
                  <h3 className={styles.transaction_category}>{transaction.category}</h3>
                  <p>
                    {transaction.description}
                  </p>
                  <time>
                    {formatDate(transaction.date)}
                  </time>
                </div>
                
                <div>
                  <div>
                    {transaction.type === 'income' ? '+' : '-'}
                    {transaction.amount.toLocaleString()} ₽
                  </div>
                  <button
                    onClick={() => deleteTransaction(transaction.id)} 
                    className={styles.button}
                    >
                    Удалить
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};