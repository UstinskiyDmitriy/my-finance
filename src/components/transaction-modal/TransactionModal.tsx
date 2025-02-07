import styles from './TransactionModal.module.css';
import { useTransactions } from '../../features/transactions/hooks';

interface TransactionModalProps {
  type: 'income' | 'expense';
  onClose: () => void;
}

export default function TransactionModal({ type, onClose }: TransactionModalProps) {
  const { incomeByCategory, expenseByCategory } = useTransactions();

  const dataByCategory = type === 'income' ? incomeByCategory : expenseByCategory;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h2>{type === 'income' ? 'Доходы' : 'Расходы'}</h2>
        <button className={styles.closeButton} onClick={onClose}>×</button>

        {Object.keys(dataByCategory).length === 0 ? (
          <p>{type === 'income' ? "Нет статей доходов" : "Нет статей расходов"}</p>
        ) : (
          <ul className={styles.list}>
            {Object.entries(dataByCategory).map(([category, amount]) => (
              <li key={category} className={styles.transaction}>
                <span>{category}</span>
                <span>{amount.toLocaleString()} ₽</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
