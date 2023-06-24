import React from "react";
import s from "./styles.module.css";
import Image from "next/image";
import Link from "next/link";

function Header() {
  return (
    <div className={s.header}>
      <Link href="/home" className={s.homeLink}>
        Билетопоиск
      </Link>
      <Link href="/order" className={s.button}>
        <Image alt="basket" src="/icons/basket.svg" width={32} height={32} />
      </Link>
    </div>
  );
}

export default Header;
