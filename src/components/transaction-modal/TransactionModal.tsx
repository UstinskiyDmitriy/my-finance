import styles from './TransactionModal.module.css';
import { Transaction } from '../../features/transactions/types';

interface TransactionModalProps {
  type: 'income' | 'expense';
  transactions: Transaction[];
  onClose: () => void;
}

export default function TransactionModal({ type, transactions, onClose }: TransactionModalProps) {
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h2>{type === 'income' ? 'Доходы' : 'Расходы'}</h2>
        <button className={styles.closeButton} onClick={onClose}>×</button>
        <ul className={styles.list}>
          {transactions.length === 0 ? <p>{type === 'income' ? "Нет статей доходов" : "Нет статей расходов"}</p> : transactions.map((t) => (
            <li key={t.id} className={styles.transaction}>
              <span>{t.category}</span>
              <span>{t.amount.toLocaleString()} ₽</span>
              <span>{new Date(t.date).toLocaleDateString()}</span>
            </li>
          ))}
          
        </ul>
      </div>
    </div>
  );
}
