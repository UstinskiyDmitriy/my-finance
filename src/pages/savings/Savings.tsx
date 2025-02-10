import SavingsPercentagePicker from "../../components/percent-picker/SavingsPersantagePicker";
import SavingsGoalCard from "../../components/savings-card/SavingsGoalCard";
import styles from './Savings.module.css'
export default function Savings() {
  return (
    <div className={styles.main}>
        <h1>Накопления</h1>
        <SavingsPercentagePicker />
        <SavingsGoalCard />
    </div>
  )
}
