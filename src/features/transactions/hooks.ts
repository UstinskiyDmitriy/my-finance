import { useAppDispatch, useAppSelector } from '../../app/store';
import { Transaction, TransactionFormValues } from './types';
import { addTransaction, deleteTransaction, editTransaction, selectExpenseByCategory, selectExpenseTotal, selectIncomeByCategory, selectIncomeTotal } from './slice';

export const useTransactions = () => {
  const dispatch = useAppDispatch();
  
  const transactions = useAppSelector(
    (state) => state.transactions.items
  );

  const incomeByCategory = useAppSelector(selectIncomeByCategory);
  const expenseByCategory = useAppSelector(selectExpenseByCategory);
  const incomeTotal = useAppSelector(selectIncomeTotal);
  const expenseTotal = useAppSelector(selectExpenseTotal);

  const handleAddTransaction = (values: TransactionFormValues) => {
    dispatch(addTransaction(values));
  };

  const handleDeleteTransaction = (id: string) => {
    dispatch(deleteTransaction(id));
  };

  const handleEditTransaction = (transaction: Transaction) => {
    dispatch(editTransaction(transaction));
  };

  return {
    transactions,
    incomeTotal,
    expenseTotal,
    incomeByCategory,
    expenseByCategory,
    addTransaction: handleAddTransaction,
    deleteTransaction: handleDeleteTransaction,
    editTransaction: handleEditTransaction
  };
};