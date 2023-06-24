import Image from "next/image";
import { useState } from "react";
import s from "./styles.module.css";

const MaxTicketCount = 30;

function TicketCounter() {
  const [count, setCount] = useState<number>(0);

  return (
    <div className={s.counter}>
      <button
        name="remove"
        disabled={count === 0}
        className={s.counterButton}
        onClick={() => setCount((prev) => prev - 1)}
      >
        <Image alt="minus" src="/icons/minus.svg" width={12} height={12} />
      </button>
      <span className={s.counterValue}>{count}</span>
      <button
        name="add"
        disabled={count === MaxTicketCount}
        className={s.counterButton}
        onClick={() => setCount((prev) => prev + 1)}
      >
        <Image alt="plus" src="/icons/plus.svg" width={12} height={12} />
      </button>
    </div>
  );
}

export default TicketCounter;
