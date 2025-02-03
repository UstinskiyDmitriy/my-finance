import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useTransactions } from '../../features/transactions/hooks';
import styles from './CategoryChart.module.css';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function CategoryChart() {
  const { incomeByCategory, expenseByCategory } = useTransactions();

  const createChartData = (data: Record<string, number>, label: string) => ({
    labels: Object.keys(data),
    datasets: [
      {
        label,
        data: Object.values(data),
        backgroundColor: [
          '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40',
        ],
      },
    ],
  });

  return (
    <div className={styles.charts_container}>
      {Object.keys(incomeByCategory).length > 0 && (
        <div className={styles.chart}>
          <h3>Доходы по категориям</h3>
          <Pie data={createChartData(incomeByCategory, 'Доходы')} />
        </div>
      )}
      {Object.keys(expenseByCategory).length > 0 && (
        <div className={styles.chart}>
          <h3>Расходы по категориям</h3>
          <Pie data={createChartData(expenseByCategory, 'Расходы')} />
        </div>
      )}
      {Object.keys(incomeByCategory).length === 0 && Object.keys(expenseByCategory).length === 0 && (
        <p className={styles.noData}>Нет данных для отображения</p>
      )}
    </div>
  );
}

