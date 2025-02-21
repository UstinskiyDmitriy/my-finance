import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/store";
import { selectExpenseByCategory, selectExpenseTotal, selectIncomeByCategory, selectIncomeTotal } from "../features/selectors/TransactionSelectors";
import { loadTransactions, createTransaction, removeTransaction, editTransaction } from "../features/slices/transactionSlice";
import { Transaction} from "../types/types";
import { supabase } from "../app/supabase";

export const useTransactions = () => {
  const dispatch = useAppDispatch();

  const transactions = useAppSelector((state) => state.transactions.items);
  const incomeByCategory = useAppSelector(selectIncomeByCategory);
  const expenseByCategory = useAppSelector(selectExpenseByCategory);
  const incomeTotal = useAppSelector(selectIncomeTotal);
  const expenseTotal = useAppSelector(selectExpenseTotal);


  useEffect(() => {
    dispatch(loadTransactions());
  }, [dispatch]);


  const handleAddTransaction = async (values: Transaction) => {
    try {
      const { data: userData, error: userError } = await supabase.auth.getUser();
      if (userError || !userData.user) {
        throw new Error("Пользователь не авторизован");
      }
  
      const newTransaction = {
        ...values,
        date: new Date().toISOString(),
        user_id: userData.user.id,
      };
  
      await dispatch(createTransaction(newTransaction)).unwrap();
    } catch (error) {
      console.error("Ошибка добавления транзакции:", error);
    }
  };
  


  const handleDeleteTransaction = async (id: string) => {
    try {
      await dispatch(removeTransaction(id)).unwrap();  
    } catch (error) {
      console.error("Ошибка удаления транзакции:", error);
    }
  };


  const handleEditTransaction = async (transaction: Transaction) => {
    try {
      await dispatch(editTransaction(transaction)).unwrap();  
    } catch (error) {
      console.error("Ошибка редактирования транзакции:", error);
    }
  };

  return {
    transactions,
    incomeTotal,
    expenseTotal,
    incomeByCategory,
    expenseByCategory,
    addTransaction: handleAddTransaction,
    deleteTransaction: handleDeleteTransaction,
    editTransaction: handleEditTransaction,
  };
};
