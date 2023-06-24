import classes from "./styles.module.css";
import { useState } from "react";
import Image from "next/image";
import TicketCounter from "../TicketCounter";

type TicketListProps = {
  items: MovieType[];
};

type TicketListItemProps = {
  item: MovieType;
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
        <TicketCounter />
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
