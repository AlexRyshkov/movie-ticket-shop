import React, { useMemo } from "react";
import s from "./styles.module.css";
import Image from "next/image";
import Link from "next/link";
import { useOrderContext } from "@/features/order/OrderContext";
import useTicketCount from "@/features/order/useTicketCount";

function Header() {
  const { order } = useOrderContext();
  const ticketCount = useTicketCount(order);

  return (
    <div className={s.header}>
      <Link href="/home" className={s.homeLink}>
        Билетопоиск
      </Link>
      <div className={s.order}>
        <div className={s.ticketCount}>{ticketCount}</div>
        <Link href="/order" className={s.orderLink}>
          <Image alt="basket" src="/icons/basket.svg" width={32} height={32} />
        </Link>
      </div>
    </div>
  );
}

export default Header;
