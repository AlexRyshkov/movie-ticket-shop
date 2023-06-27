import React, {ReactNode, useState} from "react";
import s from "./styles.module.css";
import Image from "next/image";

type Props = {
  content: ReactNode;
  expandableContent: ReactNode;
};

function ExpandableItem({ content, expandableContent }: Props) {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const clickHandler = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <div className={s.item} onClick={clickHandler}>
      <div className={s.contentRow}>
        {content}
        <Image
          alt="arrow"
          src="/icons/arrow.svg"
          width={32}
          height={32}
          style={{ ...(isExpanded && { transform: "rotate(180deg)" }) }}
        />
      </div>
      {isExpanded && expandableContent}
    </div>
  );
}

export default ExpandableItem;
