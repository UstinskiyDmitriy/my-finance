import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/store";
import { selectExpenseByCategory, selectExpenseTotal, selectIncomeByCategory, selectIncomeTotal } from "../features/selectors/TransactionSelectors";
import { loadTransactions, createTransaction, removeTransaction, editTransaction } from "../features/slices/transactionSlice";
import { Transaction} from "../types/types";

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
    const newTransaction = {
      ...values,
      date: new Date().toISOString(),
    };

    try {
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
