import React from "react";
import s from "./styles.module.css";
import Image from "next/image";
import useTicketCount from "@/app/features/order/useTicketCount";
import {useOrderContext} from "@/app/features/order/OrderContext";
import Link from "next/link";

function Header() {
  const { order } = useOrderContext();
  const ticketCount = useTicketCount(order);

  return (
    <div className={s.header}>
      <Link href="/home">Билетопоиск</Link>
      <div className={s.order}>
        {ticketCount > 0 && <div className={s.ticketCount}>{ticketCount}</div>}
        <Link href="/order" className={s.orderLink}>
          <Image alt="basket" src="/icons/basket.svg" width={32} height={32} />
        </Link>
      </div>
    </div>
  );
}

export default Header;
