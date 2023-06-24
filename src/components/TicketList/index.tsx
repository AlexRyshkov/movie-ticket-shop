import classes from "./styles.module.css";
import { useState } from "react";
import Image from "next/image";

type TicketListProps = {
  items: MovieType[];
};

type TicketListItemProps = {
  item: MovieType;
};

const MaxTicketCount = 30;

TicketList.TicketCounter = function Counter() {
  const [count, setCount] = useState<number>(0);

  return (
    <div className={classes.counter}>
      <button
        name="remove"
        disabled={count === 0}
        className={classes.counterButton}
        onClick={() => setCount((prev) => prev - 1)}
      >
        <Image alt="minus" src="/icons/minus.svg" width={12} height={12} />
      </button>
      <span className={classes.counterValue}>{count}</span>
      <button
        name="add"
        disabled={count === MaxTicketCount}
        className={classes.counterButton}
        onClick={() => setCount((prev) => prev + 1)}
      >
        <Image alt="plus" src="/icons/plus.svg" width={12} height={12} />
      </button>
    </div>
  );
};

TicketList.Item = function Item({ item }: TicketListItemProps) {
  return (
    <div key={item.id} className={classes.item}>
      <div className={classes.itemLeft}>
        <img
          src={item.posterUrl}
          className={classes.itemPoster}
          style={{ backgroundImage: `url(${item.posterUrl})` }}
        />
        <div>
          <div className={classes.ticketLitemTitleistItemTitle}>
            {item.title}
          </div>
          <div className={classes.itemGenre}>{item.genre}</div>
        </div>
      </div>
      <div className={classes.itemRight}>
        <TicketList.TicketCounter />
      </div>
    </div>
  );
};

function TicketList({ items }: TicketListProps) {
  return (
    <div className={classes.list}>
      {items.map((item) => (
        <TicketList.Item item={item} />
      ))}
    </div>
  );
}

export default TicketList;
