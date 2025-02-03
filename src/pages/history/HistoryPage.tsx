import { TransactionList } from '../../components/transaction-list/TransactionList'
import styles from './HistoryPage.module.css'

export default function HistoryPage() {
  return (
    <div className={styles.main}>
       <TransactionList /> 
    </div>
  )
}
