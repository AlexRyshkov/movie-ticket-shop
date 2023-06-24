import React from "react";
import s from "./styles.module.css";
import Image from "next/image";

function Header() {
  return (
    <div className={s.header}>
      Билетопоиск
      <button className={s.button}>
        <Image alt="basket" src="/icons/basket.svg" width={32} height={32} />
      </button>
    </div>
  );
}

export default Header;
