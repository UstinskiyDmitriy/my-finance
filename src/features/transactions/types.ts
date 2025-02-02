export interface Transaction {
    id: string;
    type: 'income' | 'expense';
    category: string;
    amount: number;
    date: string;
    description: string;
  }
  
  export type TransactionFormValues = Omit<Transaction, 'id' | 'date'>;