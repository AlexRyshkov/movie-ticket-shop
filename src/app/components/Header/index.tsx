import React from "react";
import s from "./styles.module.css";
import Image from "next/image";
import useTicketCount from "@/app/features/order/useTicketCount";
import { useOrderContext } from "@/app/features/order/OrderContext";

function Header() {
  const { order } = useOrderContext();
  const ticketCount = useTicketCount(order);

  return (
    <div className={s.header}>
      <a href="/home">Билетопоиск</a>
      <div className={s.order}>
        {ticketCount > 0 && <div className={s.ticketCount}>{ticketCount}</div>}
        <a href="/order" className={s.orderLink}>
          <Image alt="basket" src="/icons/basket.svg" width={32} height={32} />
        </a>
      </div>
    </div>
  );
}

export default Header;
