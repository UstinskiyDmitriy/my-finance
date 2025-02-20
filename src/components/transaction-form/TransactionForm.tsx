import { useForm, SubmitHandler } from "react-hook-form";
import { useEffect } from "react";
import { useTransactions } from "../../hooks/useTransactions";
import styles from "./TransactionForm.module.css";
import { EXPENSE_CATEGORIES, INCOME_CATEGORIES } from "../../const/categories";
import { useAppSelector } from "../../app/store"; 
import { saveSavings } from "../../features/LocalStorage";
import { useDispatch } from "react-redux";
import { setSavings } from "../../features/slices/transactionSlice";
import { Transaction } from "../../types/types";
export const TransactionForm = () => {
  const { register, handleSubmit, reset, watch, setValue } =
    useForm<Transaction>();
  const dispatch = useDispatch()
  const { addTransaction, incomeTotal } = useTransactions();
  const percent = useAppSelector((state) => state.transactions.savingsPersentage)
  const type = watch("type", "expense");
  const categories = type === "expense" ? EXPENSE_CATEGORIES : INCOME_CATEGORIES;

  useEffect(() => {
    const saveTotalSavings = () => {
      const savings = incomeTotal * (percent / 100);
      saveSavings(savings);
      dispatch(setSavings(savings));
    };
  
    setValue("category", categories[0]);
    saveTotalSavings();
  }, [type, categories, setValue, incomeTotal, percent, dispatch]);

  const onSubmit: SubmitHandler<Transaction> = (data) => {
    addTransaction(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <div className={styles.row}>
        <label>Тип операции</label>
        <select {...register("type")}>
          <option value="expense">Расход</option>
          <option value="income">Доход</option>
        </select>
      </div>
      <div className={styles.row}>
        <label>Категория</label>
        <select {...register("category")}>
          {categories.map((cat) => (
            <option value={cat} key={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.row}>
        <label>Сумма</label>
        <input
          type="number"
          {...register("amount", { valueAsNumber: true })}
          placeholder="Введите сумму"
        />
      </div>

      <button type="submit" className={styles.submit_button}>
        Добавить
      </button>
    </form>
  );
};
