import styles from './MillionerResult.module.css'
import memImage from '../../../../public/mem.jpg'
interface ResultProps {
  name: string;
  amount: number;
}

export default function MillionResult({ name, amount }: ResultProps) {
  return (
    <div className={styles.result}>
      {amount > 1000 ? (
        <>
          <img src={memImage} alt="Work harder" className={styles.image} />
          <p>{name}, иди работай, какие нахуй {amount} рублей!?</p>
        </>
      ) : (
        <p>Это совсем скромно,{name}!<br />Может чуть больше попросишь?</p>
      )}
    </div>
  );
}
