// features/transactions/components/TransactionForm.tsx
import { useForm, SubmitHandler } from 'react-hook-form';
import { TransactionFormValues } from '../../features/transactions/types';
import { useTransactions } from '../../features/transactions/hooks';
import styles from './TransactionForm.module.css'
import { expenseCategories, incomeCategories } from '../../features/transactions/const/categories';

export const TransactionForm = () => {
  const { register, handleSubmit, reset, watch } = useForm<TransactionFormValues>();
  const { addTransaction } = useTransactions();

  const type = watch('type', 'expense')
  const categories = type === 'expense' ? expenseCategories : incomeCategories

  const onSubmit: SubmitHandler<TransactionFormValues> = (data) => {
    addTransaction(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <div className={styles.row}>
        <label>Тип операции</label>
        <select {...register('type')}>
          <option value="expense">Расход</option>
          <option value="income">Доход</option>
        </select>
      </div>
      <div className={styles.row}>
        <label>Категория</label>
        <select {...register('category')}>
          {categories.map((cat) => (
            <option value={cat} key={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <div className={styles.row}>
        <label>Сумма</label>
        <input
          type="number"
          {...register('amount', { valueAsNumber: true })}
          placeholder='Введите сумму'
        />
      </div>

      <button type="submit" className={styles.submit_button}>
        Добавить
      </button>
    </form>
  );
};