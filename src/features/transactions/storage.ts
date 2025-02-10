import { Transaction } from "./types";

export const loadTransactions = (): Transaction[] => {
  try {
    const data = localStorage.getItem("transactions");
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

export const saveTransactions = (transactions: Transaction[]) => {
  try {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  } catch (error) {
    console.error("Ошибка сохранения в localStorage:", error);
  }
};

export const loadSavings = (): number => {
  try {
    const data = localStorage.getItem("savings");
    return data ? JSON.parse(data) : 0;
  } catch {
    return 0;
  }
};

export const saveSavings = (savings: number) => {
  try {
    localStorage.setItem("savings", JSON.stringify(savings));
  } catch (error) {
    console.error("Ошибка сохранения накоплений в localStorage:", error);
  }
};

export const loadSavingsPercentage = (): number => {
  try {
    const data = localStorage.getItem("savingsPercentage");
    return data ? JSON.parse(data) : 10; // Значение по умолчанию
  } catch {
    return 10;
  }
};

export const saveSavingsPercentage = (percentage: number) => {
  try {
    localStorage.setItem("savingsPercentage", JSON.stringify(percentage));
  } catch (error) {
    console.error("Ошибка сохранения процента накоплений в localStorage:", error);
  }
};

export const loadSavingsGoal = (): number => {
  try {
    const data = localStorage.getItem("savingsGoal");
    return data ? JSON.parse(data) : 10000;
  } catch {
    return 10000;
  }
};

export const saveSavingsGoal = (goal: number) => {
  try {
    localStorage.setItem("savingsGoal", JSON.stringify(goal));
  } catch (error) {
    console.error("Ошибка сохранения цели накоплений в localStorage:", error);
  }
};
