import React from "react";
import s from "./styles.module.css";
import Link from "next/link";

function Footer() {
  return (
    <div className={s.footer}>
      <a href="/faq">Вопросы-ответы</a>
      <a href="/about">О нас</a>
    </div>
  );
}

export default Footer;
