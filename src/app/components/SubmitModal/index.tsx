"use client";

import classnames from "classnames";
import { LegacyRef, MouseEvent } from "react";
import React, { useRef } from "react";
import s from "./styles.module.css";
import { createPortal } from "react-dom";
import dynamic from "next/dynamic";
import Image from "next/image";

type Props = {
  title: string;
  message: string;
  onSubmit: () => void;
  onClose: () => void;
};

function SubmitModal({ title, message, onSubmit, onClose }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  const outsideClickHandle = (e: MouseEvent<HTMLElement>) => {
    if (e.target === ref.current) {
      onClose();
    }
  };

  return createPortal(
    <div ref={ref} className={s.backdrop} onClick={outsideClickHandle}>
      <div className={classnames("paperBlock", s.modal)}>
        <div className={s.titleRow}>
          <div className={s.title}>{title}</div>
          <Image
            alt="close"
            src="/icons/close.svg"
            width={16}
            height={16}
            className={s.closeIcon}
            onClick={onClose}
          />
        </div>
        <div className={s.message}>{message}</div>
        <div className={s.actions}>
          <button className={s.submit} onClick={onSubmit}>
            Да
          </button>
          <button className={s.cancel} onClick={onClose}>
            Нет
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}

export default dynamic(() => Promise.resolve(SubmitModal), {
  ssr: false,
});
