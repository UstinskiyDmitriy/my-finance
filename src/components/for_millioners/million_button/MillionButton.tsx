import { useState } from "react";

import styles from "./MillionButton.module.css";
import MillionModal from "../millioner_modal/MillionerModal";

export default function MillionButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.main}>
      <h1>Хочешь стать миллионером? Жми!</h1>
      <button onClick={() => setIsOpen(true)}>Стать миллионером!</button>
      {isOpen && <MillionModal onClose={() => setIsOpen(false)} />}
    </div>
  );
}
