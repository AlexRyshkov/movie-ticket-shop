import TicketList from "@/components/TicketList";
import React from "react";
import s from "./styles.module.css";

function Order() {
  const count = 12;

  return (
    <div className={s.inner}>
      <TicketList items={[]} />
      <div className="grow" />
      <div className={s.orderSummary}>123</div>
    </div>
  );
}

export default Order;
