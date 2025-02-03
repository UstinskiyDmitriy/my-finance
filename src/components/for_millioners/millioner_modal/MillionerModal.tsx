import { useState } from "react";
import styles from './MillionerModal.module.css'

import MillionResult from "../millioner_result/MillionerResult";

interface ModalProps {
  onClose: () => void;
}

export default function MillionModal({ onClose }: ModalProps) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState<number | "">("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (amount !== "" && Number(amount) > 0) {
      setSubmitted(true);
    }
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {submitted ? (
          <MillionResult name={name} amount={Number(amount)} />
        ) : (
          <>
            <h2>Заполни форму</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Введите имя"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <input
                type="number"
                placeholder="Сколько хочешь?"
                value={amount}
                onChange={(e) => setAmount(e.target.value === "" ? "" : Number(e.target.value))}
                required
              />
              <button type="submit">Подтвердить</button>
            </form>
          </>
        )}
        <button className={styles.close} onClick={onClose}>×</button>
      </div>
    </div>
  );
}
